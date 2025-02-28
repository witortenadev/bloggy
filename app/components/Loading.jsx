import React from "react";
import { VscLoading } from "react-icons/vsc";

function Loading() {
  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center">
      <div className="animate-spin">
        <VscLoading size={50} />
      </div>
    </div>
  );
}

export default Loading;
