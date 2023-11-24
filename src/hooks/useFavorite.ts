import { IUserFavs } from "@/components/ProductCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface UseFavorite {
  productId: number;
  currentUser: IUserFavs | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const hasFavorite = useMemo(() => {
    return !!currentUser?.favs.find((fav) => fav.productId === productId);
  }, [currentUser, productId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      alert("로그인을 하면 찜하기를 사용할 수 있습니다!");
    }
    try {
      let request;
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      router.refresh();
    } catch (error) {}
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
