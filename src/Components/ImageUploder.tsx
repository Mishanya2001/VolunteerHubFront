import Dropzone, {
  defaultClassNames,
  IDropzoneProps,
  ILayoutProps,
} from 'react-dropzone-uploader';

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
};

export const CustomLayout = () => {
  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
    url: 'https://httpbin.org/post',
  });

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      LayoutComponent={Layout}
      onSubmit={handleSubmit}
      accept="image/*"
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files (Custom Layout)"
    />
  );
};
