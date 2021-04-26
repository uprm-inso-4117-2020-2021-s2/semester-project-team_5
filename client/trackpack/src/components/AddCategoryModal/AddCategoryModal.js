import React, {Fragment}  from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
   } from "@chakra-ui/react";

const AddCategoryModal = (props) => {
    const {isAddingCategory, onClose} = props;

    return (  
        <Fragment>
            <Modal isCentered isOpen={isAddingCategory} onClose={() => onClose(false)}> 
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Create a new Category
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                      <FormLabel>
                          Name
                      </FormLabel>
                      <Input placeholder="Enter a name for the category" />
                  </FormControl>
                </ModalBody> 
              </ModalContent>
            </Modal>
        </Fragment>
    );
}
 
export default AddCategoryModal;