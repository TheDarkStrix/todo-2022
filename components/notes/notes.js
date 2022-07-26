import { useState, useEffect } from "react";
import ModalComponent from "../modal/model";
import firebase from "../../utils/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LoadingSkeleton from "../loading-skeleton/loading-skeleton";
import { Heading } from "../heading/heading";
dayjs.extend(relativeTime);

export default function Notes() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState();

  let colors = [
    "#F44336",
    "#FF5722",
    "#8BC34A",
    "#CDDC39",
    "#536DFE",
    "#FFC107",
    "#9C27B0",
    "#4CAF50",
  ];

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleFetchPosts = () => {
    const todoRef = firebase.database().ref("Todo");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      console.log("todos", todos);
      if (todos) {
        const todoList = [];
        const keyMap = Object.keys(todos) || [];
        console.log(keyMap);
        Object.values(todos).forEach((id, i) => {
          todoList.push({ ...id, parentId: keyMap[i] });
        });
        // for (let id in todos) {
        //   todoList.push({ id, ...todos[id], parentId: keyMap[id] });
        // }
        console.log("list", todoList);
        setTodoList(todoList);
      } else {
        setTodoList([]);
      }
    });
    return todoList.length;
  };

  useEffect(async () => {
    setLoading(true);
    handleFetchPosts();
    setLoading(false);
  }, []);
  return (
    <>
      <div>
        <div className="my-6">
          <Heading />
        </div>
        <div>
          <ModalComponent type="create" />
        </div>
      </div>
      <div>
        <div>
          <ModalComponent type="create" />
        </div>

        <div class="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {loading
              ? [...Array(4).keys()].map((value) => (
                  <LoadingSkeleton key={value} />
                ))
              : todoList.length > 0
              ? todoList &&
                todoList.length > 0 &&
                todoList.map((data, i) => (
                  <div key={data.id}>
                    <div
                      className="drop-shadow-lg rounded-lg p-4 m-6 relative"
                      style={{ backgroundColor: randomColor() }}
                    >
                      <div className="truncate text-white overflow-hidden">
                        {data.title}
                      </div>
                      <ol className="list-decimal list-inside">
                        {data?.todos?.map((todo) => (
                          <li className={todo.isDone ? "line-through" : ""}>
                            {todo.name}
                          </li>
                        ))}
                      </ol>
                      <div className="text-sm text-white font-light mt-9 w-1/2 truncate">
                        {dayjs().to(dayjs(data.date))}
                      </div>
                      <div className="flex absolute right-3 bottom-3">
                        <ModalComponent
                          type="edit"
                          content={data}
                          cardIndex={i}
                          id={data.id}
                          parentId={data.parentId}
                          fetchPosts={handleFetchPosts}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : !loading && (
                  <div className="text-lg uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    No posts yet !
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}
