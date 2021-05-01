import React, {Fragment, useState}  from 'react';
import { IconPicker } from 'react-fa-icon-picker'

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
    Alert,
    AlertIcon
   } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

import { AddPackage } from "./AddPackage-services"

const errors = {};

const onSubmit = async (packageData) => {
  console.log(packageData.category_id);
  let userId = localStorage.jwtToken
      ? jwt_decode(localStorage.jwtToken).sub
      : undefined;
  packageData.user_id = userId
  let res = await AddPackage(packageData);
  // errors = res;
}

const AddPackageModal = (props) => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [packageName, setPackageName] = useState("");
    const [category, setCategory] = useState("");
    const {isAddingPackage, onClose, categories} = props;

    const [icon, setIcon] = useState("")
    return ( 
        <Fragment>
            <Modal isCentered isOpen={isAddingPackage} onClose={() => onClose(false)}> 
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Add a new package to track
                </ModalHeader>
                <ModalCloseButton />
                <Alert
                  hidden={!errors.message}
                  borderRadius="8px"
                  fontSize="x-small"
                  status="error"
                  marginBottom="8px"
                >
                  <AlertIcon />
                  {errors.message}
                </Alert>
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
                    {categories.map((value) => (
                    <option value={value.category_id} key={value.category_id}>{value.name}</option>
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
                      Select Package Icon
                    </FormLabel>
                        <IconPicker value={icon} onChange={(v) => setIcon(v)} />
                    </FormControl>
                </ModalBody> 
                <ModalFooter>
                <Button onClick={() => onSubmit({'tracking_number': trackingNumber, 'name': packageName, 'category_id': category, 'creation_date': "2021-04-29", "image_name": icon})}>Add Package</Button>
              </ModalFooter>
              </ModalContent>
              
            </Modal>
        </Fragment>
     );
}
export default AddPackageModal;