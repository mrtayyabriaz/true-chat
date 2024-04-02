// import React from 'react'
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/Hooks/Hooks";
import { setUserName } from "@/store/mainSlice";
import { useState } from "react";

type Inputs = {
  username: string,
  bio: string,
}

function Profile() {

  //==================== get set values ( START ) =========================== 
  const [saved, setSaved] = useState(false)
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.username);
  //==================== get set values  ( END )  ===========================

  //==================== handle submit ( START ) ============================

  const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({
    defaultValues: {
      username: username,
    }
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    dispatch(setUserName(data.username))
    localStorage.setItem("username", data.username)
    // setValue("username", "")
    setSaved(true)

    // join room for new username


  }

  //==================== handle submit  ( END )  ============================
  return (
    <>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl col-span-8">
        <div className=" space-y-6 p-10 pt-3 pb-16 md:block">
          <div className="space-y-0.5">
            <div className=" flex justify-end cursor-pointer w-full">
              <Link to={'/chat'} className="p-2 w-max dark:hover:bg-zinc-700 rounded-sm">
                <X className="" />
              </Link>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings.
            </p>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full my-6"
          ></div>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <nav className="sticky top-0 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <Link
                  className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
                  to="/examples/forms"
                >
                  Profile
                </Link>
                <Link
                  className="hidden items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
                  to="/setting/appearance"
                >
                  Appearance
                </Link>
              </nav>
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                  </p>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full"
                ></div>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":r4f:-form-item"
                    >
                      Username
                    </label>
                    {errors.username && <h1 className="text-red-400">error</h1>}
                    <input
                      {...register('username')}
                      autoFocus
                      className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-2 aria-[invalid]:border-red-400 ${saved ? 'bg-green-900' : ''}`}
                      placeholder="mrtayyabriaz"
                      id=":r4f:-form-item"
                      aria-describedby=":r4f:-form-item-description"
                      name="username"
                      disabled={saved ? true : false}
                    />
                    <p
                      id=":r4f:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      This is your public display name. users can message you with this name.
                    </p>
                  </div>
                  <div className="space-y-2 hidden">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":r4g:-form-item"
                    >
                      Email
                    </label>
                    <button
                      type="button"
                      role="combobox"
                      aria-controls="radix-:r4h:"
                      aria-expanded="false"
                      aria-autocomplete="none"
                      dir="ltr"
                      data-state="closed"
                      data-placeholder=""
                      className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1"
                      id=":r4g:-form-item"
                      aria-describedby=":r4g:-form-item-description"
                      aria-invalid="false"
                    >
                      <span style={{ pointerEvents: "none" }}>
                        Select Link verified email to display
                      </span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-50"
                        aria-hidden="true"
                      >
                        <path
                          d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    {/* <select
                      aria-hidden="true"
                      tabIndex={-1}
                      style={{
                        position: "absolute",
                        border: "0px",
                        width: " 1px",
                        height: " 1px",
                        padding: " 0px",
                        margin: " -1px",
                        overflow: " hidden",
                        whiteSpace: " nowrap",
                        overflowWrap: "normal",
                      }}
                    >
                      <option value=""></option>
                      <option value="m@example.com">m@example.com</option>
                      <option value="m@google.com">m@google.com</option>
                      <option value="m@support.com">m@support.com</option>
                    </select> */}
                    <p
                      id=":r4g:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      You can manage verified email addresses in your{" "}
                      <Link to="/examples/forms">email settings</Link>.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor=":r4i:-form-item"
                    >
                      Bio
                    </label>
                    <textarea
                      {...register('bio')}
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Tell us Link little bit about yourself"
                      name="bio"
                      id=":r4i:-form-item"
                      aria-describedby=":r4i:-form-item-description"
                      aria-invalid="false"
                    // defaultValue={'I Like Coding.'} 
                    />

                    <p
                      id=":r4i:-form-item-description"
                      className="text-[0.8rem] text-muted-foreground"
                    >
                      This will be displayed on your profile.
                    </p>
                  </div>
                  <div className="hidden">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor=":r4j:-form-item"
                      >
                        URLs
                      </label>
                      <p
                        id=":r4j:-form-item-description"
                        className="text-[0.8rem] text-muted-foreground"
                      >
                        Add links to your website, blog, or social media
                        profiles.
                      </p>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id=":r4j:-form-item"
                        aria-describedby=":r4j:-form-item-description"
                        aria-invalid="false"
                        defaultValue="https://mrtayyabriaz.netlify.app"
                        name="urls.0.value"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                        htmlFor=":r4k:-form-item"
                      >
                        URLs
                      </label>
                      <p
                        id=":r4k:-form-item-description"
                        className="text-[0.8rem] text-muted-foreground sr-only"
                      >
                        Add links to your website, blog, or social media
                        profiles.
                      </p>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        id=":r4k:-form-item"
                        aria-describedby=":r4k:-form-item-description"
                        aria-invalid="false"
                        defaultValue="http://twitter.com/shadcn"
                        name="urls.1.value"
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs mt-2"
                      type="button"
                    >
                      Add URL
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    type="submit"
                  >
                    Update profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
