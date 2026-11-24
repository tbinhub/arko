"use client";

import { FileJson2, LoaderCircle, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

type ImportDiagramDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport: (file: File) => Promise<boolean>;
};

export function ImportDiagramDialog({ open, onOpenChange, onImport }: ImportDiagramDialogProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isImporting, setIsImporting] = useState(false);

    async function submitImport() {
        if (!file) return;
        setIsImporting(true);
        const imported = await onImport(file);
        setIsImporting(false);

        if (imported) {
            setFile(null);
            onOpenChange(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Import an Arko diagram</DialogTitle>
                    <DialogDescription>
                        Select a versioned Arko JSON document to replace the current canvas.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <FieldLabel
                        htmlFor="diagram-file"
                        className="flex min-h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 p-6 text-center hover:bg-muted/50"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg border bg-background shadow-xs">
                            <UploadCloud className="size-5 text-muted-foreground" />
                        </span>
                        <span>Choose an Arko JSON file</span>
                        <Badge variant="outline">.arko.json</Badge>
                    </FieldLabel>
                    <Input
                        id="diagram-file"
                        type="file"
                        accept=".json,.arko.json,application/json"
                        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                    />
                    <FieldDescription>
                        The file is validated locally and is never uploaded to a server.
                    </FieldDescription>
                </Field>
                {file && (
                    <Item variant="muted" size="sm">
                        <ItemMedia variant="icon">
                            <FileJson2 className="text-primary" />
                        </ItemMedia>
                        <ItemContent className="min-w-0">
                            <ItemTitle>{file.name}</ItemTitle>
                        </ItemContent>
                    </Item>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button disabled={!file || isImporting} onClick={submitImport}>
                        {isImporting && <LoaderCircle className="animate-spin" />}
                        Import diagram
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
