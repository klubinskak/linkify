import clsx from "clsx";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationContext } from "@/app/context/notificationsContext";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any[];
  className?: string;
}

interface FormData {
  email: string;
  link: string;
  subscribe: boolean;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  data,
  className,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    link: "",
    subscribe: false,
  });
  const [error, setError] = React.useState<string | null>(null);
  const { addNotification } = useContext(NotificationContext);

  const validateLink = (link: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        '((([a-zA-Z0-9$-_@.&+!*"(),]|[a-zA-Z0-9$-_@.&+!*"(),])+\\.)+[a-zA-Z]{2,})' +
        '(\\/[a-zA-Z0-9$-_@.&+!*"(),]*)*' +
        '(\\?[a-zA-Z0-9$-_@.&+!*"(),=]*)?' +
        '(#[a-zA-Z0-9$-_@.&+!*"(),]*)?$'
    );
    return urlPattern.test(link);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLink(formData.link)) {
      setError("Please enter a valid URL");
      return;
    } else {
      setError(null);
    }
    if (!formData.email || !formData.link) {
      return;
    }
    axios
      .post("/api/submit-recommendation", {
        email: formData.email,
        url: formData.link,
      })
      .then((res: any) => {
        if (res.status === 200) {
          addNotification({
            message: "Your submission has been sent successfully. Thank you!",
            title: "Submission Successful",
            type: "success",
          });
          
          onClose();
        } else {
          console.error(res);
          setError("Something went wrong. Please try again.");
        }
      });
    if (formData.subscribe) {
      axios
        .put("/api/newsletter", {
          email: formData.email,
        })
        .then((res: any) => {
          if (res.status === 200) {
            onClose();
          } else {
            console.error(res);
            setError("Something went wrong. Please try again.");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={clsx(
          "fixed flex z-50 justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm",
          className
        )}
      >
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="z-50 w-[60%] md:w-[50%] lg:w-[30%] h-[25rem] md:h-[30rem] p-4 bg-[#0A0A0A] border border-2 rounded-lg overflow-auto">
            <DialogHeader>
              <DialogTitle className="p-2">
                <div className="flex justify-between">
                  Submit
                  <DialogClose asChild className="text-white">
                    <p className="text-white cursor-pointer">x</p>
                  </DialogClose>
                </div>
                <p className="text-xs mt-8">
                  Submit a website or tool to be featured on Linkify. Thanks!
                </p>
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-3 text-xs text-gray-400 p-2">
                <Input
                  type="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Website link"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="flex items-center mt-3  mb-3 space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.subscribe}
                    onCheckedChange={(checked) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        subscribe: !!checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Get the weekly update
                  </label>
                </span>

                <span className="text-xs text-red-400 pb-3">{error}</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <button
                className="p-3 bg-[#212529] w-full rounded rounded-full flex justify-center items-center text-center hover:opacity-80"
                type="submit"
              >
                Submit
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
};
