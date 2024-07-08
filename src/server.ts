import app from './app';
import appConfig from './config/appConfig';
import logger from './utils/logger';

const startServer = () => {
  try {
    const PORT = appConfig.getServerPort();
    app.listen(PORT, async () => {
      const sequelize = app.get('sequelize');
      await sequelize.sync();
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${(error as Error).message}`);
    process.exit(1);
  }
};

startServer();
