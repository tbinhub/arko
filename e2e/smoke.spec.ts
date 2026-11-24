import { expect, test } from "@playwright/test";

test("serves the application with security headers", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.ok()).toBe(true);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("exposes a healthy application status", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.ok()).toBe(true);
    await expect(response.json()).resolves.toMatchObject({ status: "ok" });
});

test("exposes application metadata", async ({ page, request }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Arko");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        "Create workflows, software architecture, and system diagrams visually.",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        /\/opengraph-image/,
    );

    const imageResponse = await request.get("/opengraph-image");
    expect(imageResponse.ok()).toBe(true);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
});

test("serves discovery metadata and a custom not-found page", async ({ page, request }) => {
    const robotsResponse = await request.get("/robots.txt");
    expect(robotsResponse.ok()).toBe(true);
    expect(await robotsResponse.text()).toContain("Sitemap: http://localhost:3000/sitemap.xml");

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBe(true);
    expect(await sitemapResponse.text()).toContain("<loc>http://localhost:3000/</loc>");

    const notFoundResponse = await page.goto("/missing-page");
    expect(notFoundResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Not Found" })).toBeVisible();
});
