"use client";

import { useFormState } from "react-dom";
import { Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import { createReviewRoleAction } from "@/app/actions/review-role-actions";

export function RoleForm() {
  const [state, formAction] = useFormState(createReviewRoleAction, { error: "", success: false, timestamp: 0 });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success, state.timestamp]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input 
          name="name" 
          required 
          placeholder="Ej: Faciales" 
          className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e62] text-zinc-900" 
        />
        <button type="submit" className="px-4 py-2 bg-[#4A4238] hover:bg-[#c49e62] text-white rounded-lg transition-colors flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      {state.error && <p className="text-red-500 text-sm mt-1">{state.error}</p>}
    </form>
  );
}
