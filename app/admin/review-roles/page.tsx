import { prisma } from "@/lib/prisma";
import { getReviewRoles, deleteReviewRole } from "@/app/actions/review-role-actions";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RoleForm } from "@/components/ui/RoleForm";

export const dynamic = 'force-dynamic';

export default async function AdminReviewRolesPage() {
  const roles = await getReviewRoles();

  return (
    <main className="pt-32 pb-16 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-6 mb-8 border-b border-zinc-200 pb-4">
        <Link href="/admin" className="font-label-sm text-sm uppercase tracking-widest text-zinc-500 hover:text-amber-600 transition-colors">Catálogo y Clientes</Link>
        <Link href="/admin/reviews" className="font-label-sm text-sm uppercase tracking-widest text-zinc-500 hover:text-amber-600 transition-colors">Reseñas</Link>
        <Link href="/admin/review-roles" className="font-label-sm text-sm uppercase tracking-widest text-amber-600 font-bold">Roles de Reseñas</Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>  <Link href="/admin/reviews" className="p-2 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">
              Roles y Servicios
            </h1>
            <p className="text-zinc-500">Administra las etiquetas de servicios (ej. Masaje, Lectura) para las reseñas.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Form */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="font-semibold text-lg mb-4 text-zinc-900">Agregar Nuevo Rol</h2>
            <RoleForm />
          </div>

          {/* List */}
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nombre del Rol</th>
                  <th className="px-6 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-6 text-center text-zinc-500 text-sm">
                      No hay roles creados.
                    </td>
                  </tr>
                ) : (
                  roles.map(role => (
                    <tr key={role.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {role.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          "use server";
                          await deleteReviewRole(role.id);
                        }}>
                          <button
                            type="submit"
                            title="Eliminar Rol"
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
