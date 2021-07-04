import ReactToolTip from 'react-tooltip';
import toast from 'react-hot-toast';
import Zoom from 'react-medium-image-zoom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Dropzone } from '../DropZone';
import SelectTags from './SelectTags';
import Button from '../Button';
import Active from '../Active';
import Spinner from '../Spinner';

import useCurrentUser from '../useCurrentUser';

import { options } from './SelectOptions';
import { getCurrentDate } from '../../../helpers/dateConverter';

import Rick from '../../../assets/rick.png';
import IMG_Social from '../../../assets/social.png';

import { Project, useUploadImageMutation } from '../../../generated/generated';

import {
  FormContainer,
  Submission,
  InputContainer,
  Input,
  TextArea,
  ErrorText,
  CustomSubmitCss,
  CustomEditButton,
} from './style';

import {
  CardOuter,
  CardInner,
  HeaderCollection,
  Links,
  Profile,
} from '../Card/style';

const EMAIL_STRING = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=';

function getDefaultValues(
  project:
    | Pick<
        Project,
        | 'id'
        | 'title'
        | 'preview'
        | 'description'
        | 'repoLink'
        | 'siteLink'
        | 'isApproved'
        | 'createdAt'
        | 'tags'
      >
    | undefined
) {
  if (!project) {
    return {
      title: 'Recipe App',
      preview: IMG_Social,
      description:
        'This was built using MERN stacks. Used cloudaniary for image hosting. Used netlify for hosting in the live server.',
      repoLink: '',
      siteLink: '',
      tags: [],
    };
  }
  return {
    title: project.title,
    preview: project.preview,
    repoLink: project.repoLink,
    siteLink: project.siteLink,
    description: project.description,
    tags: project.tags.map((tag) => ({ value: tag, label: tag })),
  };
}

type Inputs = {
  title: string;
  preview: string;
  repoLink: string;
  siteLink: string;
  description: string;
  tags: { value: string; label: string }[];
};

interface ProjectFormProps {
  onSubmit: (data: any) => void;
  project?:
    | Pick<
        Project,
        | 'id'
        | 'title'
        | 'preview'
        | 'description'
        | 'repoLink'
        | 'siteLink'
        | 'isApproved'
        | 'createdAt'
        | 'tags'
      >
    | undefined;
}

function ProjectForm({ onSubmit, project }: ProjectFormProps) {
  const { currentUser: user } = useCurrentUser();

  const { register, handleSubmit, control, errors, watch } = useForm<Inputs>({
    defaultValues: getDefaultValues(project),
  });

  const { title, preview, repoLink, siteLink, description } = watch();

  const [uploadImage, { loading: loadingImg }] = useUploadImageMutation();

  const submit: SubmitHandler<Inputs> = async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error("Couldn't create project");
    }
  };

  const handleImage = (event: any, onChange: any) => {
    if (event.length) {
      const reader = new FileReader();
      reader.readAsDataURL(event[0]);
      reader.onabort = () => toast.error('Oops, please try again');
      reader.onerror = () => toast.error('Oops, please try again');
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          const res = await uploadImage({
            variables: {
              path: reader.result,
            },
          });

          onChange(res?.data?.image?.url);
        }
      };
    }
  };

  return (
    <FormContainer>
      <CardOuter>
        <ReactToolTip className="notActivated" id="notActivated">
          <span>Approved</span>
        </ReactToolTip>

        <div data-tip data-for="notActivated">
          <div className="activeContainer">
            <Active active />
          </div>
        </div>

        <CardInner>
          <HeaderCollection>
            <span>{title}</span>
          </HeaderCollection>

          <Links>
            <a href={siteLink}>Live Link</a>
            <a href={repoLink}>Repo Link</a>
            <a href={EMAIL_STRING + user?.email}>Contact</a>
          </Links>

          <div className="imgContainer">
            {loadingImg ? (
              <p className="loading">
                <Spinner type="black" />
              </p>
            ) : (
              <Zoom
                image={{
                  alt: preview,
                  src: preview,
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                }}
              />
            )}
          </div>
          <Profile>
            <div className="profileContainer">
              <img alt={Rick} src={Rick} width="100%" height="100%"></img>
            </div>
            <div className="profileDetails">
              <p>{user?.name}</p>
              <p>4th weekly project</p>
            </div>
          </Profile>
          <p className="date">
            <span className="header">Published Date :</span> {getCurrentDate()}
          </p>

          <p className="description">{description}</p>
        </CardInner>
      </CardOuter>

      <Submission onSubmit={handleSubmit(submit)}>
        <span>{project ? 'Edit your' : 'Submit your'} Project</span>
        <Controller
          name="preview"
          control={control}
          render={({ onChange }) => (
            <Dropzone
              accept="image/*"
              onDrop={(e) => handleImage(e, onChange)}
            />
          )}
        />
        <InputContainer>
          <label>Title of the Project</label>
          <Input
            name="title"
            maxLength={25}
            placeholder="Title of the Project"
            ref={register({
              required: 'Title cannot be empty.',
              maxLength: {
                value: 25,
                message: 'Cannot exceed 25 words',
              },
              minLength: {
                value: 3,
                message: 'Cannot be less than 3 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name="title" as={<ErrorText />}>
            {({ message }: { message: string }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Tags</label>
          <Controller
            name="tags"
            control={control}
            render={({ onChange, value }) => (
              <SelectTags
                name="tags"
                value={value}
                options={options}
                placeholder="Tags"
                isMulti
                menuPosition="absolute"
                isSearchable
                closeMenuOnSelect={false}
                onChange={(value: any) => {
                  onChange(value);
                }}
              />
            )}
            rules={{ required: 'Tags cannot be Empty' }}
          />
          <ErrorMessage errors={errors} name="tags" as={<ErrorText />}>
            {({ message }: any) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the repository</label>
          <Input
            name="repoLink"
            placeholder="Link to the repository"
            ref={register({
              required: 'Link to the Repo Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />

          <ErrorMessage errors={errors} name="repoLink" as={<ErrorText />}>
            {({ message }: any) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the live site</label>
          <Input
            name="siteLink"
            placeholder="Link to the live site"
            ref={register({
              required: 'Link to the Live Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />
          <ErrorMessage errors={errors} name="siteLink" as={<ErrorText />}>
            {({ message }: any) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Description</label>
          <TextArea
            name="description"
            placeholder="Description of the project in 50 words."
            maxLength={150}
            minRows={7}
            maxRows={10}
            ref={register({
              required: 'Description cannot be empty.',
              maxLength: {
                value: 150,
                message: 'Cannot exceed 150 words',
              },
              minLength: {
                value: 50,
                message: 'Cannot be less than 50 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name="description" as={<ErrorText />}>
            {({ message }: any) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <Button
          addCSS={project ? CustomEditButton : CustomSubmitCss}
          type="submit"
        >
          {project ? 'Edit' : 'Submit'} your Project
        </Button>
      </Submission>
    </FormContainer>
  );
}

export default ProjectForm;
