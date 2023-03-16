import { useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import '../styles/profUser.css'; //
const Profile = (props) => {
  const location = useLocation();
  const user = location.state.userToShow;

  return (
    <Box className="user-profile-container"> {/* ajout de la classe CSS */}
      <Card className="user-profile-card"> {/* ajout de la classe CSS */}
        <CardHeader
          avatar={
            <Avatar src={`http://localhost:3000/${user.pdp}`} alt="pdp" style={{ width: 80, height: 80 }} />
          }
          action={
            <IconButton>
              <Edit />
            </IconButton>
          }
          title={`${user.nom} ${user.prenom}`}
          subheader={user.mail}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Documents :
          </Typography>
          {user.docVerif.map((file, index) => (
            <Box key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Button variant="contained" color="secondary" size="small" style={{ marginRight: '1rem' }}>
                <a href={`http://localhost:3000/${file}`} download style={{ textDecoration: 'none', color: 'white' }}>
                  {file}
                </a>
              </Button>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};
export default Profile;
