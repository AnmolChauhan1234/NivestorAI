import React, { useState, useEffect } from "react";
import {
  Badge,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useStockData } from "../hooks/useStockData";
import StockCard from "../components/StockCard";

export default function Briefing() {
  const { stocks = [], loading: stocksLoading } = useStockData(); // Default to empty array
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch notifications using your existing endpoint
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/notifications/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("notification",data.notifications)
        setNotifications(data.notifications || []); // Default to empty array if undefined
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Calculate unread count based on your existing API structure
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Mark as read using your existing endpoint
  const markAsRead = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/mark-read/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update local state to mark all as read
      setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);

    // Mark as read when clicked if it was unread
    if (!notification.is_read) {
      markAsRead();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Typography variant="h4" component="h1">
            📈 9 AM Briefing
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Today's stock insights and watchlist updates
          </Typography>
        </div>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </div>

      {/* Notifications Section - Works with your current API response */}
      <Paper elevation={3} className="p-4 mb-6">
        <Typography variant="h6" gutterBottom>
          Latest Alerts
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : notifications.length === 0 ? (
          <Typography>No new notifications</Typography>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    backgroundColor: notification.is_read
                      ? "inherit"
                      : "#f5f5f5",
                  }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(
                      notification.created_at
                    ).toLocaleString()}
                    primaryTypographyProps={{
                      fontWeight: notification.is_read ? "normal" : "bold",
                    }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Stocks Section */}
      <Typography variant="h6" gutterBottom>
        Recommended Stocks
      </Typography>
      {stocksLoading ? (
        <CircularProgress />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks && stocks.length > 0 ? (
            stocks.map((stock) => <StockCard key={stock.id} stock={stock} />)
          ) : (
            <Typography>No stocks available</Typography>
          )}
        </div>
      )}

      {/* Notification Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedNotification?.message}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedNotification?.content || "No additional details available"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedNotification &&
              new Date(selectedNotification.created_at).toLocaleString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
