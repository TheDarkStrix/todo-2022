import React, { useState } from "react";

export const TodoList = ({
  list,
  onRemoveItem,
  onEditItem,
  listIndex,
  onItemDone,
  type,
}) => {
  return (
    <div className="flex items-center w-full justify-between flex-row mt-2">
      <input
        value={list.name}
        placeholder="Enter topic"
        className={
          list.isDone
            ? "border-red-400 border-2 rounded-lg w-11/12 p-2"
            : "border-gray-400 border-2 rounded-lg w-11/12 p-2"
        }
        onChange={(e) => {
          onEditItem({ text: e.target.value, listIndex });
        }}
      />
      {type != "create" && (
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            onItemDone(listIndex);
          }}
        >
          &#10003;
        </div>
      )}

      <div
        className="hover:cursor-pointer"
        onClick={() => {
          onRemoveItem(listIndex);
        }}
      >
        X
      </div>
    </div>
  );
};

export default TodoList;
