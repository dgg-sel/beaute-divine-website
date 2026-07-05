import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Star, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { deleteReview } from "@/app/actions/review-actions";

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="pt-32 pb-16 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-6 mb-8 border-b border-zinc-200 pb-4">
        <Link href="/admin" className="font-label-sm text-sm uppercase tracking-widest text-zinc-500 hover:text-amber-600 transition-colors">Catálogo y Clientes</Link>
        <Link href="/admin/reviews" className="font-label-sm text-sm uppercase tracking-widest text-amber-600 font-bold">Reseñas</Link>
        <Link href="/admin/review-roles" className="font-label-sm text-sm uppercase tracking-widest text-zinc-500 hover:text-amber-600 transition-colors">Roles de Reseñas</Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            Gestión de Reseñas
          </h1>
          <p className="text-zinc-500">Administra las reseñas y testimonios de la plataforma.</p>
        </div>
        <Link 
          href="/admin/reviews/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#4A4238] hover:bg-[#c49e62] text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Reseña
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Autor</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Valoración</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No hay reseñas creadas aún.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {review.authorImage ? (
                          <img src={review.authorImage} alt={review.authorName} className="w-10 h-10 rounded-full object-cover bg-zinc-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold">
                            {review.authorName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-zinc-900">{review.authorName}</p>
                          {review.authorRole && <p className="text-xs text-zinc-500">{review.authorRole}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (review.rating || 5) ? 'fill-current' : 'text-zinc-300'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {review.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Visible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
                          <XCircle className="w-3.5 h-3.5" />
                          Oculta
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">
                      {format(new Date(review.createdAt), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/reviews/${review.id}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteReview(review.id);
                        }}>
                          <button
                            type="submit"
                            title="Eliminar Reseña"
                            className="inline-flex items-center gap-2 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </main>
  );
}
