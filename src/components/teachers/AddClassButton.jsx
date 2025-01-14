import { useState } from 'react';
import { Box, Button, Input, Field, Stack, defineStyle, parseColor, HStack } from '@chakra-ui/react';
import { IoAddOutline } from 'react-icons/io5';
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColorPickerArea, ColorPickerContent, ColorPickerControl, ColorPickerEyeDropper, ColorPickerLabel, ColorPickerRoot, ColorPickerSliders, ColorPickerTrigger, ColorPickerValueSwatch, ColorPickerValueText, ColorPickerInlineContent } from "@/components/ui/color-picker"

function AddClassButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [newClass, setNewClass] = useState({
        className: '',
        description: '',
        image: '',
        bgColor: '#92BFFF', // Default background color
    });

    const handleChange = (field, value) => {
        setNewClass((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveClass = () => {
        // Logic to save class (e.g., calling an API or saving to state)
        setIsOpen(false);
    };

    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: "bg",
        px: "0.5",
        top: "-3",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
            color: "fg.muted",
            top: "2.5",
            insetStart: "3",
        },
        _peerFocusVisible: {
            color: "fg",
            top: "-3",
            insetStart: "2",
        },
    })


    return (
        <>
            {/* Create Class Dialog */}
            <DialogRoot size={"lg"} placement={"center"}>
                <DialogTrigger asChild>
                    <Box
                        p={1}
                        bg="#92BFFF"
                        position="fixed"
                        aria-label="Add Class"
                        cursor="pointer"
                        borderRadius="full"
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            right: '40px',
                            zIndex: 1000,
                        }}
                    >
                        <IoAddOutline size={34} color="black" />
                    </Box>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle color="black" fontWeight="bold" textAlign="left">
                            Create New Class
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack direction="column" gap={8}>
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-name"
                                        placeholder="E.g. 201"
                                        value={newClass.className}
                                        onChange={(e) => handleChange("className", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Name</Field.Label>
                                </Box>
                            </Field.Root>
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-description"
                                        placeholder="E.g. Year 2 Class 1"
                                        value={newClass.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Description</Field.Label>
                                </Box>
                            </Field.Root>
                            {/* <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-image"
                                        value={newClass.image}
                                        onChange={(e) => handleChange("image", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Image URL</Field.Label>
                                </Box>
                            </Field.Root> */}
                            {/* for furture dev */}
                            <Field.Root>
                                <Box pos="relative" w="full">
                                    <Input
                                        className="class-bgColor"
                                        value={newClass.bgColor}
                                        onChange={(e) => handleChange("bgColor", e.target.value)}
                                    />
                                    <Field.Label css={floatingStyles}>Class Background Color</Field.Label>
                                    <ColorPickerRoot defaultValue={parseColor("#eb5e41")} maxW="200px" >
                                        <ColorPickerLabel>Color</ColorPickerLabel>
                                        <ColorPickerControl>
                                            <ColorPickerTrigger px="2">
                                                <ColorPickerValueSwatch boxSize="6" />
                                                <ColorPickerValueText minW="160px" />
                                            </ColorPickerTrigger>
                                        </ColorPickerControl>
                                        <ColorPickerContent>
                                            <ColorPickerArea />
                                            <HStack>
                                                <ColorPickerEyeDropper />
                                                <ColorPickerSliders />
                                                <ColorPickerValueSwatch />
                                            </HStack>
                                        </ColorPickerContent>
                                        <ColorPickerInlineContent>
                                            <ColorPickerArea />
                                            <HStack>
                                                <ColorPickerEyeDropper />
                                                <ColorPickerSliders />
                                                <ColorPickerValueSwatch />
                                            </HStack>
                                        </ColorPickerInlineContent>
                                    </ColorPickerRoot>
                                </Box>
                            </Field.Root>
                        </Stack>
                    </DialogBody>
                    <DialogFooter display="flex" gap={10} justifyContent="center">
                        <DialogActionTrigger asChild>
                            <Button variant="outline" bg="#FF8080" color="white" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button bg="#2D65FF" color="white" onClick={handleSaveClass}>
                                Save
                            </Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
}

export default AddClassButton;
