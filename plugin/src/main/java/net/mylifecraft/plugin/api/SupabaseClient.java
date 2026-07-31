package net.mylifecraft.plugin.api;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.mylifecraft.plugin.MyLifeCraftPlugin;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

/**
 * Cliente HTTP para comunicarse con la REST API de Supabase.
 *
 * Usa Java 21 HttpClient (ya incluido en la JDK, sin dependencias externas).
 * Autenticado con la service_role key para bypassear RLS.
 */
public class SupabaseClient {

    private final MyLifeCraftPlugin plugin;
    private final HttpClient httpClient;
    private final Gson gson;
    private final String baseUrl;
    private final String serviceKey;

    public SupabaseClient(MyLifeCraftPlugin plugin) {
        this.plugin = plugin;
        this.baseUrl = plugin.getConfig().getString("supabase.url", "").replaceAll("/$", "");
        this.serviceKey = plugin.getConfig().getString("supabase.service_key", "");
        this.gson = new Gson();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    /**
     * GET a Supabase con filtros de query string.
     * Ejemplo: fetchRows("pending_deliveries", "status=eq.pending")
     */
    public List<JsonObject> fetchRows(String table, String filter) {
        String url = baseUrl + "/rest/v1/" + table + "?" + filter;
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("apikey", serviceKey)
                    .header("Authorization", "Bearer " + serviceKey)
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                JsonArray array = gson.fromJson(response.body(), JsonArray.class);
                List<JsonObject> results = new ArrayList<>();
                for (JsonElement el : array) {
                    results.add(el.getAsJsonObject());
                }
                return results;
            } else {
                plugin.getLogger().warning("Supabase GET error [" + response.statusCode() + "]: " + response.body());
                return new ArrayList<>();
            }
        } catch (IOException | InterruptedException e) {
            plugin.getLogger().severe("Error al conectar con Supabase: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * PATCH a Supabase para actualizar un registro por filtro.
     * Ejemplo: patchRow("pending_deliveries", "id=eq." + id, payload)
     */
    public boolean patchRow(String table, String filter, JsonObject payload) {
        String url = baseUrl + "/rest/v1/" + table + "?" + filter;
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("apikey", serviceKey)
                    .header("Authorization", "Bearer " + serviceKey)
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .header("Prefer", "return=minimal")
                    .method("PATCH", HttpRequest.BodyPublishers.ofString(gson.toJson(payload)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() >= 200 && response.statusCode() < 300;
        } catch (IOException | InterruptedException e) {
            plugin.getLogger().severe("Error al actualizar Supabase: " + e.getMessage());
            return false;
        }
    }

    /**
     * POST a Supabase para insertar un nuevo registro.
     */
    public boolean insertRow(String table, JsonObject payload) {
        String url = baseUrl + "/rest/v1/" + table;
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("apikey", serviceKey)
                    .header("Authorization", "Bearer " + serviceKey)
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .header("Prefer", "return=minimal")
                    .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(payload)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() >= 200 && response.statusCode() < 300;
        } catch (IOException | InterruptedException e) {
            plugin.getLogger().severe("Error al insertar en Supabase: " + e.getMessage());
            return false;
        }
    }
}
