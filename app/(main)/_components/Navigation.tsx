"use client";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent
} from "@radix-ui/react-popover";
import { api } from "@/convex/_generated/api";
import UserItem from "./UserItem";
import {useMutation} from "convex/react"
import Item from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import TrashBox from "./TrashBox";
import Navbar from "./Navbar";

const Navigation = () => {
  const settings = useSettings(); 
  const search = useSearch() ;
  const params = useParams();
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  
  const create = useMutation(api.documents.create); 
  const isResizingRef = useRef(false);
  const router = useRouter();
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [pathName, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  //rest the side width to orginal width
  const resetWidth = () => {
    if (sideBarRef.current && navBarRef.current) {
      setisCollapsed(false);
      setIsResetting(true);

      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    }

    // when isreset is active we add transisiton for side bar and nav dar
    // this aint be drag and hold
    setTimeout(() => setIsResetting(false), 300);
  };

  const collapse = () => {
    if (sideBarRef.current && navBarRef.current) {
      setisCollapsed(true);
      setIsResetting(true);

      sideBarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("width", "100%");
      navBarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({title: "Untitled"}).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created",
      error: "Something went wrong, try again later."
    })
  }
  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item
            onClick={search.onOpen}
            label={"Search"}
            icon ={Search}
            isSearch
          />
          <Item
            onClick={settings.onOpen}
            label={"Settings"}
            icon ={Settings}
            
          />
          <Item
            onClick={handleCreate}
            label={"New Page"}
            icon ={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} 
            icon={Plus}
            label="Add a Page"
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash}/>
            </PopoverTrigger>
            <PopoverContent side={isMobile ?"bottom" : "right"} className="p-0 w-72" >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          `absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]`,
          isResetting && "transition-all ease-in-out",
          isMobile && `left-0 w-full`
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
            />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
              role="button"
            />
          )}
        </nav>
        )}
       
      </div>
    </>
  );
};

export default Navigation;
