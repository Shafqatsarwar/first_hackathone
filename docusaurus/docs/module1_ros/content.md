# Module 1: The Robotic Nervous System (ROS 2)

## Overview
In this module, we'll explore ROS 2 (Robot Operating System 2), which serves as the nervous system for robotic platforms. ROS 2 provides the communication infrastructure for robot components to interact with each other reliably and efficiently.

## Learning Objectives
- Understand ROS 2 architecture and concepts
- Create and manage ROS 2 nodes for humanoid robot control
- Design custom message types for robot communication
- Use ROS 2 tools for debugging and visualization

## 1. ROS 2 Architecture

ROS 2 is a middleware that provides services such as hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more. It's designed to be a flexible framework for developing robot applications.

The main architectural concepts in ROS 2 are:

1. **Nodes**: A node is a process that performs computation. In ROS 2, nodes are written in various languages (C++, Python, etc.) and can be distributed across different devices connected in a network.

2. **Topics**: A topic is a named bus over which nodes exchange messages. Topics implement a publish/subscribe communication pattern.

3. **Services**: Services implement a request/reply communication pattern, which is more appropriate for task-oriented behaviors that require a response.

4. **Actions**: Actions are a goal-oriented communication pattern, useful for long-running tasks that include feedback and the ability to cancel.

## 2. ROS 2 with Python (rclpy)

Most examples in this module will use rclpy, the Python client library for ROS 2.

### Creating a Publisher Node
Here's a basic example of a publisher node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Creating a Subscriber Node
Here's a basic example of a subscriber node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## 3. URDF (Unified Robot Description Format)

URDF is an XML format for representing a robot model. It can represent a robot's kinematic and dynamic properties, visual representation, and collision model.

### Basic URDF Structure

```xml
<?xml version="1.0"?>
<robot name="my_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>
</robot>
```

### URDF for Humanoid Robots

Humanoid robots have additional complexity due to their multiple limbs, joints, and the need for balance. A humanoid URDF will include:

1. **Links**: Represent rigid parts of the robot (torso, head, limbs)
2. **Joints**: Define connections between links (revolute, prismatic, fixed)
3. **Materials**: Define visual properties
4. **Gazebo plugins**: Define physics properties and sensors for simulation

## 4. Practical Exercise: Creating Your First ROS 2 Node

In this exercise, you'll create a simple ROS 2 node that publishes the position of a virtual humanoid robot's joints.

### Prerequisites:
- Docker environment running (use the textbook environment)
- Basic Python knowledge

### Steps:
1. Navigate to the module directory: `cd /workspace/modules/module1_ros`
2. Create a new package: `ros2 pkg create --build-type ament_python joint_publisher`
3. Implement the joint publisher node
4. Test the node in simulation

### Sample Code:
[joint_publisher.py content would go here in the actual implementation]

## 5. Summary

This module introduced you to ROS 2 as the communication backbone for robot systems. You learned about nodes, topics, services, and actions, and practiced creating simple publishers and subscribers. You also learned about URDF, which describes the robot's physical structure.

In the next module, we'll explore how to simulate robots in virtual environments using Gazebo.