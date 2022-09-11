import Types from "@Types";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { SuccessToast } from "../../../SuccessToast";

export const deleteAttachments = (Series) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: Types.Attachments.delete,
        payload: Series,
      });
      toast.success(<SuccessToast msg="Deleted Successfully!" />, {
        hideProgressBar: true,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};

export const addAttachments = (attachment) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: Types.Attachments.add,
        payload: attachment,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};

export const clearAttachments = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: Types.Attachments.clear,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};

export const setAttachments = (attachments) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: Types.Attachments.set,
        payload: attachments,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};

export const replaceSignleAttachment = (newFile) => {
  return async (dispatch, getState) => {
    let { Attachment } = getState();

    let oldFile = Attachment.find((x) => x?.name === newFile?.name);
    newFile.Series = uuidv4();

    Attachment = Attachment.map((x) =>
      x?.Series !== oldFile?.Series ? x : newFile
    );

    try {
      dispatch({
        type: Types.Attachments.set,
        payload: Attachment,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};
export const renameSignleAttachment = ({ attachmentNames, acceptedFile }) => {
  return async (dispatch) => {
    let blob = acceptedFile.slice(0, acceptedFile.size, acceptedFile.type);
    let fileIndex = 2;
    let newFileName = `${acceptedFile.name.split(".")[0]}(${fileIndex}).${
      acceptedFile.name.split(".")[1]
    }`;

    while (attachmentNames.includes(newFileName)) {
      newFileName = `${acceptedFile.name.split(".")[0]}(${fileIndex}).${
        acceptedFile.name.split(".")[1]
      }`;
      fileIndex++;
    }

    const newFile = new File([blob], newFileName, {
      type: acceptedFile.type,
    });

    newFile.Series = uuidv4();

    try {
      dispatch({
        type: Types.Attachments.add,
        payload: newFile,
      });
    } catch (e) {
      console.log("Joseph error");
    }
  };
};

export const replaceMultipleAttachments = ({ duplicateNames, newFiles }) => {
  return async (dispatch, getState) => {
    let { Attachment } = getState();

    const replacedFiles = Attachment.filter((x) => {
      return duplicateNames.includes(x?.name);
    });

    Attachment = Attachment.filter((x) => {
      return !replacedFiles.some((y) => {
        return y?.Series === x?.Series;
      });
    });

    newFiles.forEach((x) => {
      x.Series = uuidv4();
    });

    Attachment = [...Attachment, ...newFiles];
    try {
      dispatch({
        type: Types.Attachments.set,
        payload: Attachment,
      });
    } catch (e) {
      console.error("Joseph error", e);
    }
  };
};

export const renameMultipleAttachments = ({
  attachmentNames,
  acceptedFiles,
}) => {
  return async (dispatch, getState) => {
    let { Attachment } = getState();
    let tempRenames = [];
    let tempRenamesDone = [];
    let tempOriginals = [];

    acceptedFiles.map((x) => {
      if (attachmentNames.includes(x.name)) tempRenames.push(x);
      else tempOriginals.push(x);
    });

    tempRenames.forEach((elem, index) => {
      let blob = [elem][0].slice(0, elem.size, elem.type);
      let fileIndex = 2;
      let newFileName = `${elem.name.split(".")[0]}(${fileIndex}).${
        elem.name.split(".")[1]
      }`;

      while (attachmentNames.includes(newFileName)) {
        newFileName = `${elem.name.split(".")[0]}(${fileIndex}).${
          elem.name.split(".")[1]
        }`;
        fileIndex++;
      }

      const newFile = new File([blob], newFileName, {
        type: acceptedFiles[0].type,
      });
      tempRenamesDone.push(newFile);
    });

    tempRenamesDone = tempRenamesDone.map((x) => {
      x.Series = uuidv4();
      return x;
    });

    Attachment = [...Attachment, ...tempOriginals, ...tempRenamesDone];

    try {
      dispatch({
        type: Types.Attachments.set,
        payload: Attachment,
      });
    } catch (e) {
      console.log("Joseph error");
    }
  };
};
