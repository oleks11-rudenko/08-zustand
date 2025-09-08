import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'NoteHub - Managing online notes',
  description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
  openGraph: {
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    siteName: 'NoteHub',
    type: 'website',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Managing online notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Managing online notes',
      },
    ],
  },
};

export default async function NoteDetails({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', { id: id }],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
