<?php

require_once __DIR__ . "/../core/Model.php";

class Leave extends Model
{
    public function create($doctorId, $startDate, $endDate, $reason)
    {
        $statement = $this->db->prepare("INSERT INTO leaves (doctor_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)");
        return $statement->execute(array($doctorId, $startDate, $endDate, $reason));
    }

    public function getForDoctor($doctorId)
    {
        $statement = $this->db->prepare("SELECT * FROM leaves WHERE doctor_id = ? ORDER BY id DESC");
        $statement->execute(array($doctorId));
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAll()
    {
        $query = "SELECT leaves.*, users.name AS doctor_name FROM leaves JOIN users ON leaves.doctor_id = users.id ORDER BY leaves.id DESC";
        return $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function review($id, $status)
    {
        $statement = $this->db->prepare("UPDATE leaves SET status = ? WHERE id = ?");
        return $statement->execute(array($status, $id));
    }

    public function countPending()
    {
        return $this->db->query("SELECT COUNT(*) FROM leaves WHERE status = 'pending'")->fetchColumn();
    }
}