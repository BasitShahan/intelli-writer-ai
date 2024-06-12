import Link from 'next/link';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import Image
 from 'next/image';
interface BlogItem {
  id: number;
  image: string;
  title: string;
  publishDate: string;
}

interface Props {
  item: BlogItem;
}

const BlogCard: React.FC<Props> = ({ item }) => (
    <div className="md:w-full w-full flex bg-[#121636] justify-between p-3 md:p-6 rounded-2xl">
      <div className="flex justify-center gap-6">
        <Image
          src={item.image}
          alt={item.image}
          width={80}
          height={80}
          className="object-cover rounded-lg md:w-32 md:h-32 hover:opacity-80"
        />
        <div className="flex flex-col justify-center md:gap-3">
          <p className="text-sm md:text-lg">{item.title}</p>
          <p className="text-xs md:text-xs">{item.publishDate}</p>
        </div>
      </div>
  
      <div className="flex flex-col md:flex-row justify-center items-center text-white md:text-sm text-xs cursor-pointer ">
        <Link href={`/admin/dashboard/blog-editor?id=${item.id}`}>
          <button className="flex justify-center items-center mx-3 hover:opacity-80">
            <FaRegEdit className="mx-1" /> Update
          </button>
        </Link>
  
        <button className="flex justify-center items-center hover:opacity-80">
          <IoTrashBinOutline className="mx-1" /> Delete
        </button>
      </div>
    </div>
  );

export default BlogCard