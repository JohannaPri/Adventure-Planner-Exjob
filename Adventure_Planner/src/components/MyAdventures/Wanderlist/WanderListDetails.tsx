import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import {
  Trash,
  Pencil,
  Check,
  PlusCircle,
  CheckCircle,
  ArrowCircleLeft,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  title: string;
  title2: string;
}

interface SubFolder {
  id: string;
  typeId: number;
  data: Todo[];
  title: string;
  title2: string;
}

interface WonderListDetailsProps {
  userId: string;
  parentFolderId: string;
  title: string;
  title2: string;
}

const WonderListDetails: React.FC<WonderListDetailsProps> = ({
  userId,
  parentFolderId,
  title,
  title2,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const getSubFolderWithTypeId = useCallback(async () => {
    const subFoldersRef = collection(
      db,
      "users",
      userId,
      "userFolders",
      parentFolderId,
      "subFolders"
    );
    const q = query(
      subFoldersRef,
      where("typeId", "==", 4),
      where("title2", "==", title)
    );
    const snapshot = await getDocs(q);
    console.log("CHECK!: ", q);

    if (snapshot.empty) {
      console.error("No subfolder with typeId 4 found.");
      return null;
    }

    const subFolderDoc = snapshot.docs[0];
    return { id: subFolderDoc.id, ...subFolderDoc.data() } as SubFolder;
  }, [userId, parentFolderId, title]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      const unsubscribe = onSnapshot(subFolderRef, (snapshot) => {
        const data = snapshot.data()?.data || [];
        setTodos(data);
      });

      return () => unsubscribe();
    };

    fetchTodos();
  }, [getSubFolderWithTypeId, userId, parentFolderId]);

  /**
   * Adds a new todo to the subfolder if the input is not empty.
   * It calculates the next available ID by finding the highest ID in the current todos.
   * The new todo is added to the Firestore database and the input field is cleared.
   *
   * @returns Void. The new todo is added to the Firestore database, and the input field is reset for the next todo.
   */

  const handleAddTodo = async () => {
    if (input.trim() === "") return;

    try {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      const currentData = subFolder.data || [];
      const maxId = currentData.reduce(
        (max: number, todo: Todo) => Math.max(max, todo.id),
        0
      );
      const newId = maxId + 1;

      const newTodo = { id: newId, text: input, completed: false };
      const updatedData = [...currentData, newTodo];

      await updateDoc(subFolderRef, { data: updatedData });
      setInput("");
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const toggleComplete = async (id: number) => {
    try {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);

      await updateDoc(subFolderRef, { data: updatedTodos });
    } catch (error) {
      console.error("Error toggling todo completion: ", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      const currentData = subFolder.data || [];
      const updatedData = currentData.filter((todo: Todo) => todo.id !== id);

      await updateDoc(subFolderRef, { data: updatedData });
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      await updateDoc(subFolderRef, { data: [] });
    } catch (error) {
      console.error("Error clearing todos: ", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setInput(todo.text);
  };

  const handleSaveEdit = async () => {
    if (!editingTodo) return;

    try {
      const subFolder = await getSubFolderWithTypeId();
      if (!subFolder) return;

      const subFolderRef = doc(
        db,
        "users",
        userId,
        "userFolders",
        parentFolderId,
        "subFolders",
        subFolder.id
      );

      const currentData = subFolder.data || [];
      const updatedData = currentData.map((todo: Todo) =>
        todo.id === editingTodo.id ? { ...todo, text: input } : todo
      );

      await updateDoc(subFolderRef, { data: updatedData });
      setEditingTodo(null);
      setInput("");
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full justify-center">
        <div className="justify-center bg-gradient-to-r to-orange-50 from-orange-200 mb-10 mt-32 w-full h-auto lg:h-[100px] sm:h-auto shadow-md flex flex-col md:flex-row max-w-[952px] items-center border border-gray-200 rounded-md p-4">
          <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col gap-6 justify-center items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                editingTodo
                  ? "Modify your Adventure..."
                  : "Create a new Adventure..."
              }
              className="border border-slateGray rounded-lg pl-2 lg:w-[544px] md:w-[400px] sm:w-full w-full h-[40px] text-slateGray py-1 placeholder-gray-500"
            />
            <button
              onClick={editingTodo ? handleSaveEdit : handleAddTodo}
              className="hover:shadow shadow-black text-gray-600 hover:text-gray-800 justify-center border h-[40px] lg:min-w-[120px] md:min-w-[90px] sm:w-[120px] w-[120px] pl-4 pr-4 rounded-md border-slateGray text-sm flex items-center space-x-2 cursor-pointer"
            >
              {editingTodo ? (
                <CheckCircle size={32} weight="fill" />
              ) : (
                <PlusCircle size={32} weight="fill" />
              )}
            </button>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="absolute left-0 lg:ml-96 ml-80 sm:ml-80 md:left-3 md:ml-20">
            <button onClick={handleBackClick}>
              <ArrowCircleLeft
                className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer"
                weight="fill"
                size={32}
              />
            </button>
          </div>
          <h1 className="pb-1 font-semibold text-center uppercase w-full">
            {title}
          </h1>
        </div>
        <div className="flex flex-col lg:w-[500px] w-screen sm:w-screen min-w-screen items-center lg:min-w-[500px] md:w-[500px]">
          {todos.length > 0 ? (
            <ul className="space-y-4 w-full max-w-[952px] overflow-y-scroll no-scrollbar scroll-smooth max-h-[500px]">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="space-y-2 mt-10 w-full min-w-full max-h-[500px] scroll-smooth overflow-y-auto no-scrollbar last:mb-5 cursor-pointer"
                >
                  <div className="transition duration-300 hover:shadow-xl w-full max-w-[952px] p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg">
                    <div className="grid items-center grid-cols-2 gap-4">
                      <div className="col-span-8 space-y-2">
                        <div className="flex items-center gap-2">
                          <li
                            className={`flex w-full min-w-auto items-center justify-between px-4 py-3 rounded-md transition-all bg-white text-gray-800 ${
                              todo.completed
                                ? "bg-gray-100 border border-gray-200 text-slateGray shadow-inner shadow-gray-500"
                                : "bg-white border border-gray-200 text-slateGray shadow-md shadow-gray-500 hover:border-gray-500"
                            }`}
                          >
                            <div
                              className="flex items-center space-x-3"
                              onClick={() => toggleComplete(todo.id)}
                            >
                              {todo.completed && (
                                <Check
                                  size={24}
                                  weight="regular"
                                  className="text-slateGray"
                                />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  todo.completed ? "line-through" : ""
                                }`}
                              >
                                {todo.text}
                              </span>
                            </div>

                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(todo)}
                                className="text-gray-600 hover:text-gray-800"
                              >
                                <Pencil size={20} />
                              </button>
                              <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-orange-400 hover:text-orange-500"
                              >
                                <Trash size={24} />
                              </button>
                            </div>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm lg:text-base sm:text-sm text-gray-600 mt-6 font-medium">
              Your Wanderlist is empty. Let's start planning your next
              adventure!
            </p>
          )}

          {todos.length > 0 && (
            <div className="flex flex-col items-center justify-center col-span-4 space-y-4">
              <div className="text-lg font-bold text-black text-center">
                <button
                  onClick={handleClearAll}
                  className="mt-6 px-4 py-3 mb-6 font-semibold text-gray-600 text-base rounded-md bg-gradient-to-r to-orange-50 from-orange-200 w-full max-w-[952px] hover:text-gray-800 hover:shadow-inner hover:shadow-gray-400"
                >
                  Delete {title ? title : title2}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WonderListDetails;
