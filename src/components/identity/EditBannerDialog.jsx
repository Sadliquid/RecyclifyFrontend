import React from 'react';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogRoot,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";

function EditBannerDialog({ isOpen, onClose }) {
    return (
        <DialogRoot
            placement="center"
            motionPreset="slide-in-bottom"
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Banner</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>Customize your banner here.</p>
                    {/* Add your Banner editing options */}
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={onClose}>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}

export default EditBannerDialog;
