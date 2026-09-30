import datetime
from bson import ObjectId
from flask import Blueprint, request, jsonify
from app.database import get_database
from typing import Any

bp = Blueprint("documents", __name__)

def serialize_doc(doc: dict[str, Any]) -> dict[str, Any]:
    """Helper to convert MongoDB document to API response."""
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title", ""),
        "content": doc.get("content", ""),
        "language": doc.get("language", "mr"),
        "word_count": doc.get("word_count", 0),
        "created_at": doc.get("created_at", "").isoformat() if hasattr(doc.get("created_at"), "isoformat") else doc.get("created_at"),
        "updated_at": doc.get("updated_at", "").isoformat() if hasattr(doc.get("updated_at"), "isoformat") else doc.get("updated_at"),
    }

@bp.route("/documents", methods=["POST"])
def create_document():
    data = request.json
    if not data:
        return jsonify({"detail": "No JSON provided"}), 400
    
    title = data.get("title", "आजचा दस्तऐवज")
    content = data.get("content", "")
    word_count = len(content.split()) if content else 0
    now = datetime.datetime.now(datetime.timezone.utc)
    
    doc = {
        "title": title,
        "content": content,
        "language": "mr",
        "word_count": word_count,
        "created_at": now,
        "updated_at": now,
    }
    
    db = get_database()
    result = db.documents.insert_one(doc)
    doc["_id"] = result.inserted_id
    
    return jsonify({
        "success": True,
        "document": serialize_doc(doc)
    }), 201

@bp.route("/documents", methods=["GET"])
def get_documents():
    db = get_database()
    cursor = db.documents.find().sort("updated_at", -1)
    docs = [serialize_doc(doc) for doc in cursor]
    return jsonify({
        "success": True,
        "documents": docs
    }), 200

@bp.route("/documents/<doc_id>", methods=["GET"])
def get_single_document(doc_id: str):
    if not ObjectId.is_valid(doc_id):
        return jsonify({"detail": "Invalid document ID"}), 400
        
    db = get_database()
    doc = db.documents.find_one({"_id": ObjectId(doc_id)})
    if not doc:
        return jsonify({"detail": "Document not found"}), 404
        
    return jsonify({
        "success": True,
        "document": serialize_doc(doc)
    }), 200

@bp.route("/documents/<doc_id>", methods=["PUT"])
def update_document(doc_id: str):
    if not ObjectId.is_valid(doc_id):
        return jsonify({"detail": "Invalid document ID"}), 400
        
    data = request.json
    if not data:
        return jsonify({"detail": "No JSON provided"}), 400
        
    db = get_database()
    
    # Check if exists
    existing = db.documents.find_one({"_id": ObjectId(doc_id)})
    if not existing:
        return jsonify({"detail": "Document not found"}), 404
        
    title = data.get("title", existing.get("title"))
    content = data.get("content", existing.get("content"))
    word_count = len(content.split()) if content else 0
    now = datetime.datetime.now(datetime.timezone.utc)
    
    update_data = {
        "title": title,
        "content": content,
        "word_count": word_count,
        "updated_at": now
    }
    
    db.documents.update_one({"_id": ObjectId(doc_id)}, {"$set": update_data})
    
    # Refetch
    updated_doc = db.documents.find_one({"_id": ObjectId(doc_id)})
    
    return jsonify({
        "success": True,
        "document": serialize_doc(updated_doc)
    }), 200

@bp.route("/documents/<doc_id>", methods=["DELETE"])
def delete_document(doc_id: str):
    if not ObjectId.is_valid(doc_id):
        return jsonify({"detail": "Invalid document ID"}), 400
        
    db = get_database()
    result = db.documents.delete_one({"_id": ObjectId(doc_id)})
    
    if result.deleted_count == 0:
        return jsonify({"detail": "Document not found"}), 404
        
    return jsonify({
        "success": True
    }), 200
