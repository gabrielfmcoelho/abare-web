import { notFound } from 'next/navigation';
import { mockUserData, getAllChildIds } from '@/lib/api';
import { ChildProfile } from '@/components/children/child-profile';

export async function generateStaticParams() {
  const childIds = await getAllChildIds();
  return childIds.map((id) => ({
    id: id.toString(),
  }));
}

export default function ChildProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const child = mockUserData.family.children.find(
    (c) => c.id === parseInt(params.id)
  );

  if (!child) {
    notFound();
  }

  return <ChildProfile child={child} />;
}