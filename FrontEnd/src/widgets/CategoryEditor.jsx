// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// constants
import { CATEGORY_STATUS_OPTIONS } from "@constants/options";

// utils
import classNames from "classnames";
import { uploadFile } from "@api/client";
import { generateSlug } from "@utils/index";
import { client, Endpoint } from "@api";

const CategoryEditor = () => {
  const defaultValues = {
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    parentId: "",
    level: 1,
    sortOrder: 0,
    status: CATEGORY_STATUS_OPTIONS[0],
    isFeatured: false,
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const thumbnailValue = watch("thumbnail");

  // do something with the data
  const handlePublish = async (data) => {
    const params = {
      ...data,
      thumbnail: {
        url: data.thumbnail,
        alt: data.name,
      },
      status: data.status.value,
    };
    const result = await client.post(Endpoint.CATEGORIES, params);
    if (result) {
      toast.success("Category published successfully");
    }
  };

  // do something with the data
  const handleSave = async (data) => {
    const params = {
      ...data,
      thumbnail: {
        url: data.thumbnail,
        alt: data.name,
      },
      status: "draft",
    };
    const result = await client.put(
      `${Endpoint.CATEGORIES}/${data.id}`,
      params
    );
    if (result) {
      toast.info("Category saved successfully");
    }
  };

  const handleChangeImage = async (files) => {
    console.log("files", files);
    if (files && files.length === 1) {
      const file = files[0];
      const upload = await uploadFile(file);
      console.log("upload", upload);
      if (upload && upload?.file?.path) {
        // setValue("thumbnail", upload.file.path);
        setValue("thumbnail", upload.file.path);
        toast.success("Image uploaded successfully");
      }
    }
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">Category Settings</h5>
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div>
            <span className="block field-label mb-2.5">Category Thumbnail</span>
            <Controller
              name="thumbnail"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <DropFiles
                  wrapperClass="media-dropzone w-64 h-64"
                  onChange={handleChangeImage}
                >
                  {thumbnailValue ? (
                    <img
                      src={thumbnailValue}
                      alt="Category thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MediaDropPlaceholder />
                  )}
                </DropFiles>
              )}
            />
          </div>
          <div className="flex flex-col gap-4 mt-5">
            {/* <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                className={classNames(
                  `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                  { "field-input--error": errors.description }
                )}
                id="description"
                defaultValue={defaultValues.description}
                {...register("description", { required: true })}
              />
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="name">
              Category Name
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.name,
              })}
              id="name"
              defaultValue={defaultValues.name}
              placeholder="Enter category name"
              {...register("name", { required: true })}
              onChange={(e) => setValue("slug", generateSlug(e.target.value))}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="slug">
              Slug
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.slug,
              })}
              id="slug"
              defaultValue={defaultValues.slug}
              placeholder="Enter slug"
              {...register("slug")}
            />
          </div>
          {/* <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="parentId">
                Parent ID
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.parentId,
                })}
                id="parentId"
                defaultValue={defaultValues.parentId}
                placeholder="Enter parent ID"
                {...register("parentId")}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="level">
                Level
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.level,
                })}
                id="level"
                type="number"
                defaultValue={defaultValues.level}
                placeholder="1"
                {...register("level", { required: true, min: 1 })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="sortOrder">
                Sort Order
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.sortOrder,
                })}
                id="sortOrder"
                type="number"
                defaultValue={defaultValues.sortOrder}
                placeholder="0"
                {...register("sortOrder", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="status">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                defaultValue={defaultValues.status}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.status}
                    id="status"
                    placeholder="Select status"
                    options={CATEGORY_STATUS_OPTIONS}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
          </div> */}
          <div className="field-wrapper">
            <label className="field-label" htmlFor="status">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              defaultValue={defaultValues.status}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isInvalid={errors.status}
                  id="status"
                  placeholder="Select status"
                  options={CATEGORY_STATUS_OPTIONS}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="description">
              Description
            </label>
            <textarea
              className={classNames(
                `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                { "field-input--error": errors.description }
              )}
              id="description"
              defaultValue={defaultValues.description}
              {...register("description", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="mr-2"
              />
              Is Featured
            </label>
          </div>
          <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
            <button
              className="btn btn--secondary"
              onClick={handleSubmit(handleSave)}
            >
              Save to Drafts
            </button>
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Publish Category
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default CategoryEditor;
