import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { User } from "@/types/entities.type";
import { ColumnDef } from "@tanstack/react-table";

export type LeaderBoardType = {
  user: User;
  answerNumber: number;
  createdNumber: number;
};

export const columns: ColumnDef<LeaderBoardType>[] = [
  {
    accessorKey: "user",
    header: "Users",
    cell: ({ row }) => {
      const user = row.getValue("user") as User;
      return (
        <div className="flex items-center justify-start gap-5">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatarURL}
              alt="Avatar"
            />
          </Avatar>
          <div className="flex flex-col items-start justify-center">
            <Label className="text-xl font-bold">{user.name}</Label>
            <Label className="text-lg font-thin">{user.id}</Label>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "answerNumber",
    header: () => <div className="text-center">Answered</div>,
    cell: ({ row }) => {
      const answerNumber = row.getValue("answerNumber") as string;
      return (
        <div className="flex items-center justify-center gap-5">
          <Label className="text-md">{answerNumber}</Label>
        </div>
      );
    },
  },
  {
    accessorKey: "createdNumber",
    header: () => <div className="text-center">Created</div>,
    cell: ({ row }) => {
      const createdNumber = row.getValue("createdNumber") as string;
      return (
        <div className="flex items-center justify-center gap-5">
          <Label className="text-md">{createdNumber}</Label>
        </div>
      );
    },
  },
];
