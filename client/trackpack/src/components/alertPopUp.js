import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogFooter,
  } from "@chakra-ui/react";

function AlertPopUp({
    popup,
    reference,
    header,
    body,
    buttonName,
    buttonColor,
    onClose
}) {

    return (
        <AlertDialog
          isOpen={popup}
          leastDestructiveRef={reference}
          onClose={!popup}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {header}
              </AlertDialogHeader>

              <AlertDialogBody>
                {body}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme={buttonColor}
                  ref={reference}
                  onClick={onClose}
                  ml={3}
                >
                  {buttonName}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
    )

}

export default AlertPopUp;