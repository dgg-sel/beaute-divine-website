import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createReview, updateReview } from "@/app/actions/review-actions";
import { getReviewRoles } from "@/app/actions/review-role-actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewImageUpload } from "@/components/ui/ReviewImageUpload";

async function saveReview(isNew: boolean, id: string, formData: FormData) {
  "use server";
  const data = {
    authorName: formData.get("authorName") as string,
    authorRole: formData.get("authorRole") as string,
    authorImage: formData.get("authorImage") as string,
    content: formData.get("content") as string,
    rating: parseInt(formData.get("rating") as string) || 5,
    isActive: formData.get("isActive") === "on",
  };

  if (isNew) {
    await createReview(data);
  } else {
    await updateReview(id, data);
  }
  redirect("/admin/reviews");
}

export default async function ReviewEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const [review, roles] = await Promise.all([
    isNew ? null : prisma.review.findUnique({ where: { id: params.id } }),
    getReviewRoles()
  ]);

  if (!isNew && !review) return notFound();

  const handleSave = saveReview.bind(null, isNew, params.id);

  return (
    <main className="pt-32 pb-16 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto pb-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/reviews" className="p-2 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">
              {isNew ? "Nueva Reseña" : "Editar Reseña"}
            </h1>
            <p className="text-zinc-500">
              {isNew ? "Añade un nuevo testimonio a la plataforma." : "Modifica los detalles de la reseña seleccionada."}
            </p>
          </div>
        </div>

        <form action={handleSave} className="space-y-6 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Nombre del Autor *</label>
              <input 
                name="authorName" 
                defaultValue={review?.authorName || ""}
                required 
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e62] text-zinc-900" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700">Servicio / Rol (Opcional)</label>
                <Link 
                  href={`/admin/review-roles?returnTo=/admin/reviews/${params.id}`} 
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-[#4A4238] hover:bg-[#c49e62] text-white rounded-md transition-colors"
                >
                  Administrar Roles
                </Link>
              </div>
              <select
                name="authorRole"
                defaultValue={review?.authorRole || ""}
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e62] text-zinc-900"
              >
                <option value="">Seleccione un servicio...</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Foto del Autor</label>
            <ReviewImageUpload defaultImage={review?.authorImage || ""} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Valoración (Estrellas)</label>
            <select 
              name="rating" 
              defaultValue={review?.rating || 5}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e62] text-zinc-900"
            >
              {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} {v === 1 ? 'Estrella' : 'Estrellas'}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Contenido (Admite Markdown) *</label>
            <textarea 
              name="content" 
              defaultValue={review?.content || ""}
              required 
              rows={5}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c49e62] text-zinc-900" 
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              name="isActive" 
              id="isActive"
              defaultChecked={review ? review.isActive : true}
              className="w-4 h-4 text-[#c49e62] rounded border-zinc-300 focus:ring-[#c49e62]"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-zinc-700">
              Reseña Visible (Activa)
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex justify-end gap-3">
            <Link href="/admin/reviews" className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-[#4A4238] hover:bg-[#c49e62] text-white rounded-lg transition-colors">
              Guardar Reseña
            </button>
          </div>
        </form>
      </div>
      </div>
    </main>
  );
}
