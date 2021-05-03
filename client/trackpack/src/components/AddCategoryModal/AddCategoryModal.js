import React, { Fragment, useState } from "react";
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

import { addCategory } from "./AddCategory-services";

const onSubmit = async (newCategory, onClose, categories) => {
  let res;
  res = await addCategory(newCategory);
  await categories.push({'category_id' : res.category.category_id, 'name' : newCategory.name, 'user_id': newCategory.user_id})
  window.location.reload();
}
 
var name = undefined;

const AddCategoryModal = (props) => {
    const {isAddingCategory, onClose, userId, categories} = props;
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
                <Button onClick={() =>
                  name && onSubmit({
                    user_id: userId, 
                    name: name
                  }, () => onClose(false), categories)
                }>Add Category</Button>
              </ModalFooter>
              </ModalContent>
            </Modal>
        </Fragment>
    );
}



 
export default AddCategoryModal;
