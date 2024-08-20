import { _getUsers } from "@/lib/_DATA";
import { setUsers } from "@/stores/features/users/userSlice";
import { RootState } from "@/stores/store";
import { User, UserLogin } from "@/types/entities.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    if (!usersList) {
      getUsers().then((data) => {
        dispatch(setUsers(data));
      });
    }
  }, [dispatch]);

  const getUserByName = async (name: string): Promise<User> => {
    return await _getUsers().then((data) => {
      return Object.values(data!).find((item) => item.id === name) as User;
    });
  };

  const getUsers = async (): Promise<User[]> => {
    const users = await _getUsers().then((data) => {
      return Object.values(data!).map((item: User) => ({
        id: item.id,
        name: item.name,
        avatarURL: item.avatarURL,
        answers: item.answers,
        questions: item.questions,
      }));
    });
    return users;
  };

  const login = async (user: UserLogin) => {
    try {
      const useByName = await getUserByName(user.username!);
      console.log(useByName);
      if (!useByName) {
        return false;
      } else if (user.password === useByName.password) {
        return { ...useByName, password: "" };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserById = async (id: string): Promise<User> => {
    return usersList?.find((item) => item.id === id) as User;
  };

  const updateUsers = async (
    userId: string,
    questionId: string
  ): Promise<User[]> => {
    return await getUserById(userId).then(() => {
      const updatedUsers = usersList?.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            questions: [...user.questions, questionId],
          };
        }
        return user;
      });

      dispatch(setUsers(updatedUsers as User[]));
      return updatedUsers as User[];
    });
  };

  return { login, getUsers, getUserById, updateUsers, usersList };
};
