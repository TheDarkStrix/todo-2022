import React, { useState } from "react";
import firebase from "../../utils/firebase";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function ModalComponent(props) {
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);

  const [notes, setNotes] = useState("");
  const [notesValue, setNotesValue] = useState(props.content);

  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => {
    setNotes(e.target.value);
    console.log(e.target.value);
  };

  const handleOnChangeEvent = (e) => {
    setNotesValue(e.target.value);
    console.log(e.target.value);
  };

  const deleteNote = async () => {
    const todoRef = firebase.database().ref("Todo").child(props.id);
    await todoRef.remove();
    toggle();
  };

  const submitNote = async (type) => {
    console.log("submit", type);
    if (type === "create") {
      const todoRef = firebase.database().ref("Todo");
      const note = {
        notes,
        date: "May 20,2020",
      };
      await todoRef.push(note);
      toggle();
    } else if (type === "edit") {
      const todoRef = firebase.database().ref("Todo").child(props.id);
      await todoRef.update({
        notes: notesValue,
      });
      toggle();
    }
  };

  return (
    <div>
      {props.type == "create" ? (
        //   <Button color="danger" onClick={toggle}>
        //     {buttonLabel}
        //   </Button>

        <div onClick={toggle}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-plus"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </div>
      ) : (
        <div onClick={toggle}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-pencil"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            />
          </svg>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {props.type == "create" ? "Create Note" : "Edit Note"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleText">
              {props.type == "create" ? "Enter Note" : "Edit Note"}
            </Label>
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              onChange={
                props.type == "create" ? handleOnChange : handleOnChangeEvent
              }
              value={props.type == "create" ? notes : notesValue}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => submitNote(props.type)}>
            Submit
          </Button>
          {props.type == "edit" ? (
            <Button color="danger" onClick={deleteNote}>
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
