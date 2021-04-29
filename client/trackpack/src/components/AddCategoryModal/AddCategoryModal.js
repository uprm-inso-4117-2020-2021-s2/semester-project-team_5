import React, {Fragment}  from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button
   } from "@chakra-ui/react";

import axios from "axios";


const addCategory = async(newCategory) => {
  const url = "http://localhost:5000";
  console.log(newCategory)
    let errorMessage;
    let response = await axios
      .post(url + "/categories", newCategory)
      .catch((err) => {
        errorMessage = err.response.data;
    })
return errorMessage ? errorMessage : response.data;
}
 
var name = undefined;


const AddCategoryModal = (props) => {
    const {isAddingCategory, onClose, userId} = props;
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
                      <Input placeholder="Enter a name for the category" onChange={(v) => name = v.target.value}/>
                  </FormControl>
                </ModalBody> 
                <ModalFooter>
                <Button onClick={
                  name && addCategory({
                    user_id: userId, 
                    name: name
                  }), () => onClose(false)
                }>Add Category</Button>
              </ModalFooter>
              </ModalContent>
            </Modal>
        </Fragment>
    );
}



 
export default AddCategoryModal;