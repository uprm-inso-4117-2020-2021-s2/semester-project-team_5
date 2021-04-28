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
import jwt_decode from "jwt-decode";

import { AddPackage } from "./AddPackage-services"

const onSubmit = async (packageData) => {
  // console.log(packageData);
  let userId = localStorage.jwtToken
      ? jwt_decode(localStorage.jwtToken).sub
      : undefined;
  packageData.user_id = userId
  let res = await AddPackage(packageData);
  console.log(res)
}

const AddPackageModal = (props) => {
    const {isAddingPackage, onClose} = props;
    const [trackingNumber, setTrackingNumber] = useState("");
    const [packageName, setPackageName] = useState("");
    const [category, setCategory] = useState("");
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
                      <Input onChange={e=> setTrackingNumber(e.target.value)} placeholder="Enter Package Tracking Number" />   
                  </FormControl>
                  <FormControl> 
                    <FormLabel>
                      Category
                    </FormLabel>
                    <Select onChange={e=> setCategory(e.target.value)} placeholder="Select a category">
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
                    <Input onChange={e=> setPackageName(e.target.value)} placeholder="Enter Package Name" />   
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Add a Package Image
                    </FormLabel>
                    <Button> Pick an image</Button>
                  </FormControl>
                </ModalBody> 
                <ModalFooter>
                <Button onClick={() => onSubmit({'tracking_number': trackingNumber, 'name': packageName, 'category_id': category, 'creation_date': Date.now()})}>Add Package</Button>
              </ModalFooter>
              </ModalContent>
              
            </Modal>
        </Fragment>
     );
}
export default AddPackageModal;