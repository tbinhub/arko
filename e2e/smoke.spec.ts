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

    await expect(page).toHaveTitle("Workspace | Arko");
    await expect(page.getByRole("heading", { name: "Software Workflow" })).toBeVisible();
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

test("uses the collapsible workspace sidebar", async ({ page }) => {
    await page.goto("/");

    const sidebar = page.locator('[data-slot="sidebar"][data-state]');
    await expect(sidebar).toHaveAttribute("data-state", "expanded");
    await expect(sidebar.locator('img[src="/icon.svg"]')).toBeVisible();

    const menuTriggers = page.locator('[data-slot="dropdown-menu-trigger"]');
    const menuContent = page.locator('[data-slot="dropdown-menu-content"][data-open]');

    await menuTriggers.first().click();
    await expect(menuContent).toBeVisible();
    expect(
        await menuContent.evaluate((element) => element.getBoundingClientRect().width),
    ).toBeGreaterThanOrEqual(224);
    await page.keyboard.press("Escape");

    await menuTriggers.last().click();
    await expect(menuContent).toBeVisible();
    expect(
        await menuContent.evaluate((element) => element.getBoundingClientRect().width),
    ).toBeGreaterThanOrEqual(224);
    await page.keyboard.press("Escape");

    await page.getByRole("main").getByRole("button", { name: "Toggle Sidebar" }).click();
    await expect(sidebar).toHaveAttribute("data-state", "collapsed");
    await expect(page.getByRole("button", { name: "Workspace", exact: true })).toBeVisible();
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

test("opens the empty React Flow canvas", async ({ page }) => {
    await page.goto("/editor/e2e-preview?template=blank");

    await expect(page.getByLabel("Diagram title")).toHaveValue("Software Workflow");
    await expect(page.locator(".react-flow")).toBeVisible();
    await expect(page.locator(".react-flow__node")).toHaveCount(0);
    await expect(page.locator(".react-flow__controls")).toBeVisible();
    await expect(page.locator(".react-flow__minimap")).toBeVisible();

    await page.getByRole("button", { name: "Export" }).click();
    await expect(page.getByRole("menuitem", { name: "Arko JSON", exact: true })).toBeVisible();
    const jsonDownloadPromise = page.waitForEvent("download");
    await page.getByRole("menuitem", { name: "Arko JSON", exact: true }).click();
    const jsonDownload = await jsonDownloadPromise;
    expect(jsonDownload.suggestedFilename()).toBe("software-workflow.arko.json");

    await page.getByRole("button", { name: "Export" }).click();
    await page.getByRole("menuitem", { name: "Import Arko JSON" }).click();
    await expect(page.getByRole("dialog", { name: "Import an Arko diagram" })).toBeVisible();
    const downloadedFile = await jsonDownload.path();
    if (!downloadedFile) throw new Error("Expected the exported diagram file to exist");
    await page.locator('input[type="file"]').setInputFiles(downloadedFile);
    await page.getByRole("button", { name: "Import diagram" }).click();
    await expect(page.getByText("Diagram imported")).toBeVisible();
});

test("restores locally saved diagram changes", async ({ page }) => {
    const documentId = `persistence-${Date.now()}`;
    await page.goto(`/editor/${documentId}?template=blank`);
    await expect(page.locator(".react-flow__node")).toHaveCount(0);

    const title = page.getByLabel("Diagram title");
    await title.fill("Resilient commerce platform");
    await page.waitForTimeout(350);
    await expect
        .poll(() =>
            page.evaluate((id) => window.localStorage.getItem(`arko:diagram:${id}`), documentId),
        )
        .toContain("Resilient commerce platform");
    await page.reload();

    await expect(title).toHaveValue("Resilient commerce platform");
});

test("keeps the editor usable on a mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/editor/mobile-${Date.now()}?template=blank`);

    await expect(page.locator(".react-flow")).toBeVisible();
    await expect(page.locator(".react-flow__node")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Add component" })).toHaveCount(0);
});
