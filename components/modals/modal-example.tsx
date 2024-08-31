"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function ModalExample({
  foo,
  isOpen,
  setIsOpen,
}: {
  foo: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Modal</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Foo: {foo}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
