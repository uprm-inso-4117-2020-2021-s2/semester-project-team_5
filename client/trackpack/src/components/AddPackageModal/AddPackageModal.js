import React, {Fragment, useState}  from 'react';
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
    Select,
    Button,
   } from "@chakra-ui/react";

const AddPackageModal = (props) => {
    const {isAddingPackage, onClose} = props;
    const [values, setValues] = useState([
      { option: "Unlisted" },
      { option: "Electronics" },
      { option: "Food" },
      { option: "Clothes" },
    ]);
    return ( 
        <Fragment>
            <Modal isCentered isOpen={isAddingPackage} onClose={() => onClose(false)}> 
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Add a new package to track
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                      <FormLabel> 
                        Tracking Number 
                      </FormLabel>
                      <Input placeholder="Enter Package Tracking Number" />   
                  </FormControl>
                  <FormControl> 
                    <FormLabel>
                      Category
                    </FormLabel>
                    <Select placeholder="Select a category">
                      {/* in the future this will use the categories obtained from an API call. */ }
                    {values.map((value) => (
                    <option key={value.option}>{value.option}</option>
                    ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Package Name
                    </FormLabel>
                    <Input placeholder="Enter Package Name" />   
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Add a Package Image
                    </FormLabel>
                    <Button> Pick an image</Button>
                  </FormControl>
                </ModalBody> 
                <ModalFooter>
                <Button>Add Package</Button>
              </ModalFooter>
              </ModalContent>
              
            </Modal>
        </Fragment>
     );
}
export default AddPackageModal;