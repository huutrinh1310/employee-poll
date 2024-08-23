import { ContentLayout } from "@/components/layout/ContentLayout";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { columns, LeaderBoardType } from "./data-table/columns";
import { LeaderDataTable } from "./data-table/data-table";

export default function LeaderBoardPage() {
  const [users, setUsers] = useState<LeaderBoardType[]>([]);
  const { usersList } = useUser();

  useEffect(() => {
    if (usersList) {
      setUsers(
        usersList
          .map((item) => ({
            user: item,
            answerNumber: Object.keys(item.answers).length,
            createdNumber: item.questions.length,
          }))
          .sort(
            (a, b) =>
              b.answerNumber +
              b.createdNumber -
              (a.answerNumber + a.createdNumber)
          )
      );
    }

    return () => setUsers([]);
  }, [usersList]);

  return (
    <ContentLayout title="Leader board">
      <div className="container mx-auto py-10">
        <LeaderDataTable
          columns={columns}
          data={users}
        />
      </div>
    </ContentLayout>
  );
}
