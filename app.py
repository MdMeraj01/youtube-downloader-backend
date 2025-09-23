<<<<<<< HEAD
import os
from flask import Flask, render_template, request, jsonify, send_file
from flask_mail import Mail, Message
from flask_cors import CORS
import requests
import yt_dlp
import io

from dotenv import load_dotenv
load_dotenv()  # only used for local dev if you have a .env

app = Flask(__name__, template_folder="templates", static_folder="static")

# CORS - allow frontend origin (you can restrict later)
CORS(app, resources={r"/*": {"origins": "*"}})

# Mail config from environment
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')       # your email
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')       # app password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])

mail = Mail(app)

# Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        # ---- Mail to admin ----
        admin_email = os.getenv('ADMIN_EMAIL', app.config['MAIL_USERNAME'])
        admin_msg = Message(
            subject="📩 New Contact Form Submission",
            recipients=[admin_email],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(admin_msg)

        # ---- Auto-reply to user ----
        try:
            user_msg = Message(
                subject="✅ Thanks for contacting us!",
                recipients=[email],
                body=f"Hello {name},\n\nThank you for reaching out! We received your message:\n\n\"{message}\"\n\nWe will get back to you soon.\n\n— Team"
            )
            mail.send(user_msg)
        except Exception as e:
            # Don't break if user email fails — still return success to frontend
            app.logger.error("Failed to send auto-reply: %s", e)

        # If frontend expects JSON
        if request.headers.get('Accept') == 'application/json' or request.is_json:
            return jsonify({"success": True, "message": "Email sent"}), 200

        return render_template("contact.html", success=True)

    return render_template("contact.html", success=False)

# (Keep your download routes — be careful about large files & ephemeral filesystem)
@app.route("/download/video", methods=["GET"])
def download_video():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    ydl_opts = {"format": "bestvideo+bestaudio/best", "outtmpl": "downloads/%(title)s.%(ext)s"}
    os.makedirs("downloads", exist_ok=True)

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)

    return send_file(filename, as_attachment=True)

# Thumbnail code (keeps as-is)
@app.route("/download/thumbnail", methods=["GET"])
def download_thumbnail():
    url = request.args.get("url")
    import re
    regex = r"(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)"
    match = re.search(regex, url)
    video_id = match.group(1) if match else None
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    quality_map = {"Default":"default.jpg","Medium":"mqdefault.jpg","High":"hqdefault.jpg","Standard":"sddefault.jpg","Max Resolution":"maxresdefault.jpg"}
    file_name = quality_map.get(request.args.get("quality","Max Resolution"), "maxresdefault.jpg")
    thumbnail_url = f"https://img.youtube.com/vi/{video_id}/{file_name}"

    r = requests.get(thumbnail_url, stream=True)
    return send_file(io.BytesIO(r.content), mimetype="image/jpeg", as_attachment=True, download_name=f"{video_id}_{file_name}")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")

if __name__ == "__main__":
    # Local dev: load port from env (Render provides PORT env var)
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=(os.getenv("FLASK_DEBUG","True")=="True"))
=======
import os
from flask import Flask, render_template, request, jsonify, send_file
from flask_mail import Mail, Message
from flask_cors import CORS
import requests
import yt_dlp
import io

from dotenv import load_dotenv
load_dotenv()  # only used for local dev if you have a .env

app = Flask(__name__, template_folder="templates", static_folder="static")

# CORS - allow frontend origin (you can restrict later)
CORS(app, resources={r"/*": {"origins": "*"}})

# Mail config from environment
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')       # your email
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')       # app password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])

mail = Mail(app)

# Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        # ---- Mail to admin ----
        admin_email = os.getenv('ADMIN_EMAIL', app.config['MAIL_USERNAME'])
        admin_msg = Message(
            subject="📩 New Contact Form Submission",
            recipients=[admin_email],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(admin_msg)

        # ---- Auto-reply to user ----
        try:
            user_msg = Message(
                subject="✅ Thanks for contacting us!",
                recipients=[email],
                body=f"Hello {name},\n\nThank you for reaching out! We received your message:\n\n\"{message}\"\n\nWe will get back to you soon.\n\n— Team"
            )
            mail.send(user_msg)
        except Exception as e:
            # Don't break if user email fails — still return success to frontend
            app.logger.error("Failed to send auto-reply: %s", e)

        # If frontend expects JSON
        if request.headers.get('Accept') == 'application/json' or request.is_json:
            return jsonify({"success": True, "message": "Email sent"}), 200

        return render_template("contact.html", success=True)

    return render_template("contact.html", success=False)

# (Keep your download routes — be careful about large files & ephemeral filesystem)
@app.route("/download/video", methods=["GET"])
def download_video():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    ydl_opts = {"format": "bestvideo+bestaudio/best", "outtmpl": "downloads/%(title)s.%(ext)s"}
    os.makedirs("downloads", exist_ok=True)

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)

    return send_file(filename, as_attachment=True)

# Thumbnail code (keeps as-is)
@app.route("/download/thumbnail", methods=["GET"])
def download_thumbnail():
    url = request.args.get("url")
    import re
    regex = r"(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)"
    match = re.search(regex, url)
    video_id = match.group(1) if match else None
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    quality_map = {"Default":"default.jpg","Medium":"mqdefault.jpg","High":"hqdefault.jpg","Standard":"sddefault.jpg","Max Resolution":"maxresdefault.jpg"}
    file_name = quality_map.get(request.args.get("quality","Max Resolution"), "maxresdefault.jpg")
    thumbnail_url = f"https://img.youtube.com/vi/{video_id}/{file_name}"

    r = requests.get(thumbnail_url, stream=True)
    return send_file(io.BytesIO(r.content), mimetype="image/jpeg", as_attachment=True, download_name=f"{video_id}_{file_name}")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")

if __name__ == "__main__":
    # Local dev: load port from env (Render provides PORT env var)
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=(os.getenv("FLASK_DEBUG","True")=="True"))
>>>>>>> 0e7f951cb12a91f0556f3cc9eccf6088adac7d55
