import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";

export default function ProfileCard() {
  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <Carousel className="w-75 max-w-xs">
        <CarouselContent>
          <CarouselItem key="1" className=" flex items-center justify-center ">
            <div className="p-1">
              <Card className="w-70 border-gray-400 shadow-lg rounded-4xl shrink">
                <CardHeader className="flex items-center pl-4 pr-4 pt-4">
                  <FcBusinesswoman size={60} />
                  <div className="ml-4">
                    <CardTitle className="text-lg font-semibold">
                      Ashika Habib Khan
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Student
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-10 pb-4 text-justify">
                  <p>ID: 22301371</p>
                  <p>Section: 10</p>
                  <p>Group: 5</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem key="2" className=" flex items-center justify-center">
            <div className="p-1">
              <Card className="w-70 border-gray-400 shadow-lg rounded-4xl">
                <CardHeader className="flex items-center pl-4 pr-4 pt-4">
                  <FcBusinesswoman size={60} />
                  <div className="ml-4">
                    <CardTitle className="text-lg font-semibold">
                      Israt Abdullah Neha
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Student
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-10 pb-4 text-justify">
                  <p>ID: 22301583</p>
                  <p>Section: 10</p>
                  <p>Group: 5</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem key="3" className=" flex items-center justify-center">
            <div className="p-1">
              <Card className="w-70 border-gray-400 shadow-lg rounded-4xl">
                <CardHeader className="flex items-center pl-4 pr-4 pt-4">
                  <FcBusinessman size={60} />

                  <div className="ml-4">
                    <CardTitle className="text-lg font-semibold">
                      Md. Nurul Amin Khan Dipto
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Student
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-10 pb-4 text-justify">
                  <p>ID: 22301526</p>
                  <p>Section: 10</p>
                  <p>Group: 5</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
