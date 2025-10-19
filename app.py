from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os
from datetime import datetime

app = Flask(__name__, template_folder='templates')
app.secret_key = os.environ.get('SECRET_KEY', 'dev-fallback-key')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

@app.route('/tours')
def tours():
    return render_template('tours.html')

@app.route('/seasons')
def seasons():
    return render_template('seasons.html')

@app.route('/bookings')
def bookings():
    return render_template('booking.html')

# База данных - JSON файлы
DATA_DIR = 'data'
TOURS_FILE = os.path.join(DATA_DIR, 'tours.json')
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
BOOKINGS_FILE = os.path.join(DATA_DIR, 'bookings.json')

def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_json(file_path, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ===== API ROUTES =====
@app.route('/api/tours', methods=['GET'])
def api_tours():
    tours = load_json(TOURS_FILE)
    return jsonify(tours)

@app.route('/api/tours/<tour_id>', methods=['GET'])
def api_tour(tour_id):
    tours = load_json(TOURS_FILE)
    tour = next((t for t in tours if t['id'] == tour_id), None)
    if tour:
        return jsonify(tour)
    return jsonify({'error': 'Tour not found'}), 404

@app.route('/api/bookings', methods=['GET', 'POST'])
def api_bookings():
    if request.method == 'GET':
        if 'user_id' not in session:
            return jsonify([])
        bookings = load_json(BOOKINGS_FILE)
        user_bookings = [b for b in bookings if b['user_id'] == session['user_id']]
        return jsonify(user_bookings)
    
    elif request.method == 'POST':
        if 'user_id' not in session:
            return jsonify({'error': 'Not authorized'}), 401
        
        booking_data = request.json
        booking_data['id'] = str(datetime.now().timestamp())
        booking_data['user_id'] = session['user_id']
        booking_data['booking_date'] = datetime.now().isoformat()
        booking_data['status'] = 'active'
        
        bookings = load_json(BOOKINGS_FILE)
        bookings.append(booking_data)
        save_json(BOOKINGS_FILE, bookings)
        
        return jsonify({'success': True, 'booking_id': booking_data['id']})

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    users = load_json(USERS_FILE)
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    
    if user:
        session['user_id'] = user['id']
        session['user_email'] = user['email']
        session['user_name'] = user['name']
        return jsonify({'success': True, 'user': user})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    user_data = request.json
    
    users = load_json(USERS_FILE)
    if any(u['email'] == user_data['email'] for u in users):
        return jsonify({'error': 'User already exists'}), 400
    
    user_data['id'] = str(datetime.now().timestamp())
    users.append(user_data)
    save_json(USERS_FILE, users)
    
    session['user_id'] = user_data['id']
    session['user_email'] = user_data['email']
    session['user_name'] = user_data['name']
    
    return jsonify({'success': True, 'user': user_data})

@app.route('/api/auth/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/user', methods=['GET'])
def api_user():
    if 'user_id' in session:
        return jsonify({
            'id': session['user_id'],
            'email': session['user_email'],
            'name': session['user_name']
        })
    return jsonify({'error': 'Not logged in'}), 401

# ===== ИНИЦИАЛИЗАЦИЯ ДАННЫХ =====
def init_data():
    """Создает начальные данные если их нет"""
    if not os.path.exists(TOURS_FILE):
        initial_tours = [
            {
                "id": "santorini",
                "name": "Santorini Luxury Tour Package",
                "image": "https://static.wixstatic.com/media/81b99f_df5e9da19f464d0bb96bc15670b9d4b1~mv2.jpg/v1/crop/x_0,y_121,w_2738,h_1583/fill/w_602,h_348,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/dreamstime_l_146011399.jpg",
                "price": "€2,500",
                "duration": "7 days",
                "hotel": "5-star Luxury",
                "description": "Experience the breathtaking beauty of Santorini with our luxury tour package. Enjoy stunning caldera views, private pools, and premium amenities."
            },
            {
                "id": "malta",
                "name": "Malta Cultural Experience Tour",
                "image": "https://relax-yachting.com/images/Malta/marshrut_malta5.jpg",
                "price": "€1,800",
                "duration": "8 days",
                "hotel": "4-star Boutique",
                "description": "Discover the rich history and stunning coastline of Malta. Explore historic sites, traditional fishing villages, and enjoy authentic Maltese cuisine."
            },
            {
                "id": "preikestolen",
                "name": "Preikestolen Adventure Tour",
                "image": "https://yaturisto.ru/wp-content/uploads/2019/03/image-8-e1551713874892.jpg",
                "price": "€1,200",
                "duration": "5 days",
                "hotel": "3-star Hotels",
                "description": "Embark on an adventure to Preikestolen in Norway. Experience breathtaking Norwegian nature, fjord cruises, and guided hikes."
            }
        ]
        save_json(TOURS_FILE, initial_tours)

# Инициализация при запуске
init_data()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

