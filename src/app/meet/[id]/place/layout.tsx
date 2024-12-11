import PlaceLayout from '@/components/Layouts/PlaceLayout/PlaceLayout';

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return <PlaceLayout>{children}</PlaceLayout>;
}
