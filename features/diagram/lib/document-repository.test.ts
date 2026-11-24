import { beforeEach, describe, expect, it } from "vitest";
import { createDiagramDocument } from "@/features/diagram/model/templates";
import { listLocalDocuments, readLocalDocument, writeLocalDocument } from "./document-repository";

describe("local document repository", () => {
    beforeEach(() => window.localStorage.clear());

    it("stores and restores a versioned diagram", () => {
        const document = createDiagramDocument("saved-diagram", "web-application");
        writeLocalDocument(document);

        expect(readLocalDocument(document.id)).toEqual(document);
        expect(listLocalDocuments()).toHaveLength(1);
    });

    it("ignores invalid persisted data", () => {
        window.localStorage.setItem("arko:diagram:invalid", '{"schemaVersion":99}');

        expect(readLocalDocument("invalid")).toBeNull();
        expect(listLocalDocuments()).toEqual([]);
    });
});
