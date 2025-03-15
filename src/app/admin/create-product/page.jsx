"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  image: z.string().nonempty("ImageURL is required"),
  stock: z.coerce.number().min(1, { message: "Stock is required" }),
});

export default function CreateProduct({ className, ...props }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      stock: "",
    },
  });
  const onSubmit = async ({
    name,
    description,
    category,
    price,
    image,
    stock,
  }) => {
    try {
      setLoading(true);

      const response = await fetch("/api/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          price,
          image,
          stock,
        }),
      });
      setLoading(false);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product added successfully!");
        console.log(data);
        setLoading(false);
      }
      return data;
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className={cn("flex flex-col gap-6", className)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create Product</CardTitle>
              <CardDescription>
                Enter information below to create a product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="Category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>{" "}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Price"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>{" "}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Stock"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>{" "}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <Input placeholder="URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      {!loading ? (
                        <Button type="submit" className="w-full">
                          Create Product
                        </Button>
                      ) : (
                        <Button disabled>
                          <Loader2 className="animate-spin" />
                          Please wait
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
