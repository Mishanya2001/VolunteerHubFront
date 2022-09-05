import { Container, Grid } from "@mui/material";
import { useCurrentPostConnections } from "../Hooks/currentPostConnections";
import { IPost, IPostConnection } from "../models";
import CustomErrorMessage from "./CustomErrorMessage";
import CustomModal from "./CustomModal";
import PostConnectionView from "./PostConnectionView";
import SiteLoader from "./SiteLoader";
import { useState } from "react";
import PostConnectionDetails from "./PostConnectionDetails";
import { useCurrentUser } from "../Hooks/currentUser";
import ScrollableCustomModal from "./ScrollableCustomModal";

function AccountMessages() {
  const { error, loading, currentUserConnections } =
    useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  const { currentUser } = useCurrentUser();

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <Container
        sx={{
          "@media": {
            maxWidth: "none",
          },
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            width: "80%",
            margin: "0px auto",
          }}
        >
          {currentUserConnections.map((postCon) => {
            return (
              <Grid
                item
                key={postCon.postConnectionId}
                sx={{
                  width: "100%",
                  padding: "0px!important",
                  margin: "20px",
                }}
              >
                <PostConnectionView
                  connection={postCon}
                  key={postCon.postConnectionId}
                  setCurrentConnection={(currentConnection: IPostConnection) =>
                    setCurrentConnectionModal(currentConnection)
                  }
                  isDetailsVisible={true}
                />
              </Grid>
            );
          })}
          {/* set modal for post view */}
          {currentConnectionModal !== undefined && (
            <ScrollableCustomModal
              onClose={() => setCurrentConnectionModal(undefined)}
            >
              <h1 className="modal-title">{"Post Connection Details"}</h1>
              <PostConnectionDetails
                connection={currentConnectionModal}
                currentUser={currentUser}
              />
            </ScrollableCustomModal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccountMessages;
