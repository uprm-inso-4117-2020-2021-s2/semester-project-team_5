import axios from "axios";

export const AddPackage = async (packageData) => {
  let errorMessage;
  const carrier = determineCarrier(packageData.tracking_number);
  if (carrier) {
    packageData.carrier = carrier;
    let res = await axios
      .post("http://localhost:5000/packages", packageData)
      .catch((err) => {
        errorMessage = err.response.data;
      });
    return errorMessage;
  } else {
    return {'message': 'Tracking Number is invalid.'};
  }
};

const determineCarrier = (trackingNumber) => {
  const UPSregex = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/;
  const FedEXregex = /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/;
  const FedEXregex2 = /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/;
  const FedEXregex3 = /^[0-9]{15}$/;
  const USPSregex = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/;
  const USPSregex2 = /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/;
  const USPSregex3 = /^91[0-9]+$/;
  const USPSregex4 = /^[A-Za-z]{2}[0-9]+US$/;

  if (UPSregex.test(trackingNumber)) {
    // its UPS
    return "UPS";
  } else if (
    FedEXregex.test(trackingNumber) ||
    FedEXregex2.test(trackingNumber) ||
    FedEXregex3.test(trackingNumber)
  ) {
    //it's fedex
    return "FEDEX";
  } else if (
    USPSregex.test(trackingNumber) ||
    USPSregex2.test(trackingNumber) ||
    USPSregex3.test(trackingNumber) ||
    USPSregex4.test(trackingNumber)
  ) {
    // it's USPS
    return "USPS";
  } else {
    //throw error. It's not supported yet.
    return null;
  }
};
