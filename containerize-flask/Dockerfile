# Use the official python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app


# Copy the file from your host to your current location
COPY . /app/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Expose port 8080 for the Flask application
EXPOSE 5000

# Define the command to run when the container starts
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
