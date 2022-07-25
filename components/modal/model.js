import React, { useState, Fragment, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../utils/firebase";
import { Dialog, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import TodoList from "../todoList/ToDoList";

export default function ModalComponent(props) {
  const [modal, setModal] = useState(false);
  const [cardTitle, setCardTitle] = useState(props?.content?.title || "");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (props.content) {
      setCardTitle(props.content.title);
      if (props?.content?.todos > 0) {
        setTodoList(props?.content?.todos);
      }
    }
    () => {};
  }, [props.content]);

  const toggle = () => {
    setTodoList(props?.content?.todos);
    setModal(!modal);
  };

  const handleCardTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const deleteNote = async () => {
    const todoRef = firebase.database().ref("Todo").child(props.id);
    await todoRef.remove();
    toggle();
  };

  const onEditTodoItem = ({ text, listIndex }) => {
    let tempList = todoList ? [...todoList] : [];
    tempList[listIndex].name = text;
    setTodoList(tempList);
  };

  const onMakeAsDoneTodoItem = (listIndex) => {
    let tempList = todoList ? [...todoList] : [];
    tempList[listIndex].isDone = true;
    setTodoList(tempList);
  };

  const addTodoItem = () => {
    const tempList = todoList ? [...todoList] : [];
    tempList.push({
      id: uuidv4(),
      name: todoTitle,
      isDone: false,
    });
    console.log("final block", tempList);
    setTodoList(tempList);
  };

  const deleteTodoItem = (index) => {
    console.log("index", index);
    const tempList = todoList ? [...todoList] : [];
    tempList.splice(index, 1);
    setTodoList(tempList);
  };

  const submitNote = async (type) => {
    console.log("submit", type);
    if (type === "create") {
      const todoRef = firebase.database().ref("Todo");
      const note = {
        title: cardTitle,
        id: uuidv4(),
        todos: todoList ? [...todoList] : [],
      };
      await todoRef.push(note);
    } else if (type === "edit") {
      const todoRef = firebase.database().ref("Todo").child(props.id);
      await todoRef.update({
        title: cardTitle,
        id: props.id,
        todos: todoList ? [...todoList] : [],
      });
    }
    toggle();
    setCardTitle("");
  };
  console.log("sadsad", todoList);
  return (
    <>
      {props.type === "create" ? (
        <button
          onClick={toggle}
          className="bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center absolute bottom-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
          </svg>
        </button>
      ) : (
        <div className="flex">
          <button
            onClick={toggle}
            className="bg-black hover:bg-gray-900 text-white text-center rounded-full justify-center p-2 flex items-center bottom-4 right-4 w-8 h-8 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <button
            onClick={deleteNote}
            className="bg-black hover:bg-gray-900 text-white text-center rounded-full justify-center p-2 flex items-center bottom-4 right-4 w-8 h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}

      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggle}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.type == "create" ? "Create Note" : "Edit Note"}
                  </Dialog.Title>
                  <div className="">
                    <input
                      placeholder="Enter card title"
                      className="w-full p-2 my-2 border-gray-400 border-2 rounded-lg"
                      onChange={(e) => handleCardTitleChange(e)}
                      value={cardTitle}
                    />

                    <div>
                      <div className="flex flex-col">
                        {todoList && todoList.length > 0 ? (
                          todoList.map((list, index) => (
                            <TodoList
                              list={list}
                              listIndex={index}
                              onRemoveItem={deleteTodoItem}
                              onItemDone={onMakeAsDoneTodoItem}
                              onEditItem={onEditTodoItem}
                              type={props.type}
                            />
                          ))
                        ) : (
                          <div>No tasks added</div>
                        )}
                      </div>

                      <div
                        onClick={() => addTodoItem({ cardId: uuidv4() })}
                        className="rounded-md border border-transparent mt-4 bg-sky-400 px-4 py-2 text-sm font-medium text-white hover:bg-sky-300 hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      >
                        Add +
                      </div>
                    </div>
                    {/* <textarea
                      id="message"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-100 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your message..."
                      onChange={
                        props.type == "create"
                          ? handleOnChange
                          : handleOnChangeEvent
                      }
                      value={props.type == "create" ? notes : notesValue}
                    ></textarea> */}
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={toggle}
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        onClick={() => submitNote(props.type)}
                      >
                        {props.type === "create" ? "Create" : "Save"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
